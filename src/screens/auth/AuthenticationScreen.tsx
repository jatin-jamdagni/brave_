import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Text, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {useAndroidId} from '../../hooks/useAndroidId';
import {useAuth} from '../../hooks/useAuth';
import {IMAGE} from '../../constants/images';
import {Color} from '../../constants/color';
import {CustomButton} from '../../components/ui/CustomButton';
import {
  createMainMasterTable,
  createModuleTable,
} from '../../services/databaseService';

const AuthenticationScreen = () => {
  const {
    isLoading: isAndroidIdLoading,
    androidId,
    error: androidIdError,
    fetchAndroidId,
  } = useAndroidId();
  const {
    login,
    isLoading: isLoginLoading,
    error: loginError,
    userToken,
  } = useAuth();

  const handleAuthenticate = async () => {
    if (!androidId) {
      await fetchAndroidId();
    } else if (!userToken) {
      await login(androidId);
    }
  };

  useEffect(() => {
    createMainMasterTable();
    createModuleTable();
  }, []);

  useEffect(() => {
    if (androidId && !userToken) {
      login(androidId);
    }
  }, [androidId, userToken, login]);

  const isLoading = isAndroidIdLoading || isLoginLoading;
  const error = androidIdError || loginError;

  return (
    <View style={styles.card}>
      <Image source={IMAGE.RealLogin} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subtitle}>
          Please authenticate Device to Continue.
        </Text>
        <View style={styles.formContainer}>
          {isLoading ? (
            <ActivityIndicator size="small" color={Color.success} />
          ) : userToken && !error ? (
            <Text style={styles.authenticatedText}>
              Authenticated Successfully
            </Text>
          ) : error ? (
            <Text style={styles.errorText}>{error.message}</Text>
          ) : null}
        </View>

        <CustomButton
          buttonStyle={{backgroundColor: Color.secondary}}
          textStyle={styles.buttonText}
          rightIcon={<RightIcon />}
          title={userToken ? 'Authenticated' : 'Authenticate'}
          disabled={isLoading || !!userToken}
          loading={isLoading}
          onPress={handleAuthenticate}
        />
      </View>
    </View>
  );
};

const RightIcon = () => {
  return <Icon name="locked" size={20} color={Color.white} />;
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Color.background,
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: 470,
    borderBottomRightRadius: 32,
    borderBottomLeftRadius: 32,
  },
  contentContainer: {
    padding: 16,
  },
  formContainer: {
    padding: 16,
    height: 50,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    color: Color.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: Color.lightGray,
  },
  authenticatedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.white,
  },
});

export default AuthenticationScreen;
