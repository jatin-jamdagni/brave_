import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import * as Keychain from 'react-native-keychain';
import {
  fetchMasterData,
  storeMasterData,
  getMasterData,
} from '../services/dataService';
import {openDatabase} from '../services/databaseService';

interface AuthContextData {
  userToken: string | null;
  login: (androidId: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
  syncProgress: number;
  clearDatabase: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [syncProgress, setSyncProgress] = useState(0);

  const retrieveToken = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log('Token retrieved successfully!', credentials.password);
        setUserToken(credentials.password);
      } else {
        console.log('No token stored');
      }
    } catch (error) {
      console.log('Could not retrieve token:', error);
    }
  };

  const login = useCallback(async (androidId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `http://192.168.146.83:2324/api/user/${androidId}`,
      );
      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      const token = data.token;
      console.log('this is response', data);

      await Keychain.setGenericPassword('user', token);
      setUserToken(token);
      console.log('Token stored successfully!');

      // Fetch and store data only if it doesn't exist in SQLite
      const db = await openDatabase();
      const existingData = await getMasterData(db);
      if (!existingData || existingData.length === 0) {
        const masterData = await fetchMasterData(token);
        await storeMasterData(db, masterData, progress => {
          setSyncProgress(progress);
        });
      }
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error('Authentication failed'),
      );
      console.log('Could not store token or fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      setIsLoading(true);
      await Keychain.resetGenericPassword();
      setUserToken(null);
      setSyncProgress(0);
      await clearDatabase();
      console.log('Token cleared and database reset successfully!');
    } catch (error) {
      console.log('Could not clear token or reset database:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearDatabase = async () => {
    try {
      setIsLoading(true);
      const db = await openDatabase();
      await db.transaction(tx => {
        tx.executeSql('DELETE FROM mainMasterData');
        tx.executeSql('DELETE FROM moduleMasterData');
      });
      console.log('Database cleared successfully');
    } catch (error) {
      console.log('Could not clear database:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    retrieveToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        login,
        logout,
        isLoading,
        error,
        syncProgress,
        clearDatabase,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
