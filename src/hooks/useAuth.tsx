import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import * as Keychain from 'react-native-keychain';
import {fetchMasterData} from '../services/dataService';
import {clearDatabaseTables} from '../services/databaseService';

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

  // if (!isDbReady) {
  //   return <LoadingScreen />;
  // }

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
      console.error('Could not retrieve token:', error);
    }
  };

  const login = useCallback(async (androidId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `https://awlapkbackend.awlinternational.com/api/user/${androidId}`,
      );

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      const token = data.token;

      await Keychain.setGenericPassword('user', token);
      setUserToken(token);
      console.log('Token stored successfully!');

      await fetchMasterData(token)
        .then(() => {
          console.log('Master data fetched successfully!');
        })
        .catch(error => {
          console.error('Error fetching master data:', error);
        });
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error('Authentication failed'),
      );
      console.error('Error during login:', error);
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

      await clearDatabaseTables();

      console.log('Logged out and database cleared successfully!');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearDatabase = async () => {
    try {
      setIsLoading(true);

      await clearDatabaseTables();

      console.log('Database cleared successfully');
    } catch (error) {
      console.error('Error clearing database:', error);
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
