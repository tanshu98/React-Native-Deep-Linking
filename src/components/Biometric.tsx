import React, { useEffect } from 'react';
import {Alert, View} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
// import { Text } from 'react-native-paper';
const Biometric = () => {
  const enableBiometricAuth = () => {
    const rnBiometrics = new ReactNativeBiometrics();
    rnBiometrics
      .isSensorAvailable()
      .then(resultObject => {
        const {available, biometryType} = resultObject;

        if (available && biometryType === BiometryTypes.TouchID) {
          Alert.alert(
            'TouchID',
            'Would you like to enable TouchID authentication for the next time?',
            [
              {
                text: 'Yes please',
                onPress: async () => {
                  Alert.alert(
                    'Success!',
                    'TouchID authentication enabled successfully!',
                  );
                },
              },
              {text: 'Cancel', style: 'cancel'},
            ],
          );
        } else if (available && biometryType === BiometryTypes.FaceID) {
          Alert.alert(
            'FaceID',
            'Would you like to enable FaceID authentication for the next time?',
            [
              {
                text: 'Yes please',
                onPress: async () => {
                  Alert.alert(
                    'Success!',
                    'FaceID authentication enabled successfully!',
                  );
                },
              },
              {text: 'Cancel', style: 'cancel'},
            ],
          );
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          Alert.alert(
            'Device Supported Biometrics',
            'Biometrics authentication is supported.',
          );
        } else {
          Alert.alert(
            'Biometrics not supported',
            'This device does not support biometric authentication.',
          );
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert(
          'Error',
          'An error occurred while checking biometrics availability.',
        );
      });
  };
  const handleBiometricAuth = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const {success, error} = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to continue',
      });

      if (success) {
        Alert.alert('Success', 'Biometric authentication successful');
        return true;
      } else {
        Alert.alert('Authentication failed', 'Biometric authentication failed');
        return false;
      }
    } catch (error) {
      console.error('[handleBiometricAuth] Error:', error);
      Alert.alert('Error', 'Biometric authentication failed from device');
      return false;
    }
  };

  useEffect(() => {
    enableBiometricAuth();
    handleBiometricAuth();
  }, []);
  return null;
};

export default Biometric;
