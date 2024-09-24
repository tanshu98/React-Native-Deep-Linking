import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {authorize} from 'react-native-app-auth';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Login = ({navigation}: any) => {
  const [googleIsSigningIn, setGoogleIsSigningIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const webClientId =
    '1030970755549-jrp3lom0vi2mb58chqriagn2meihmke7.apps.googleusercontent.com';

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: webClientId,
    });
  });

  const googleLogin = async () => {
    try {
      // If user is already signed in--
      const isSignedIn = await GoogleSignin.signIn();
      if (isSignedIn) {
        const userInfo = await GoogleSignin.getCurrentUser();
        console.log('userInfo', userInfo);
        navigation.navigate('Home');
        return;
      }
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      navigation.navigate('Home');
    } catch (error) {
      console.log('error konta ahe bc----', error);

      if (error === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('SIGN_IN_CANCELLED', error);
      } else if (error === statusCodes.IN_PROGRESS) {
        Alert.alert('IN_PROGRESS', error);
      } else if (error === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('PLAY_SERVICES_NOT_AVAILABLE', error);
      } else {
        console.log('inside else block');
        Alert.alert('Sign-In Error', `An error occurred: ${error}`, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    }

    // try {
    //   // Prevent multiple sign-in attempts
    //   if (googleIsSigningIn) {
    //     console.log('Sign-in already in progress...');
    //     return;
    //   }
  
    //   // Set sign-in progress to true
    //   setGoogleIsSigningIn(true);
  
    //   // Check if user is already signed in
    //   const isSignedIn = await GoogleSignin.signIn();
    //   if (isSignedIn) {
    //     const userInfo = await GoogleSignin.getCurrentUser();
    //     console.log('User already signed in:', userInfo);
    //     navigation.navigate('Home');
    //     setGoogleIsSigningIn(false);  // Reset sign-in state
    //     return;
    //   }
  
    //   // If not signed in, proceed with sign-in
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   console.log('userInfo', userInfo);
    //   navigation.navigate('Home');
    // } catch (error) {
    //   console.log('error konta ahe bc----', error);
  
    //   if (error === statusCodes.SIGN_IN_CANCELLED) {
    //     Alert.alert('SIGN_IN_CANCELLED', 'Sign-in was cancelled by the user.');
    //   } else if (error === statusCodes.IN_PROGRESS) {
    //     Alert.alert('IN_PROGRESS', 'Sign-in is already in progress.');
    //   } else if (error=== statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     Alert.alert('PLAY_SERVICES_NOT_AVAILABLE', 'Google Play services are not available.');
    //   } else {
    //     // Generic error handling
    //     Alert.alert('Sign-In Error', `An error occurred: ${error}`, [
    //       { text: 'OK', onPress: () => console.log('OK Pressed') },
    //     ]);
    //   }
    // } finally {
    //   // Reset sign-in state to false when sign-in process completes or fails
    //   setGoogleIsSigningIn(false);
    // }
  };

  const facebookLogin = async () => {
    try {
      setLoading(true); // Start loading indicator
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        console.log('Login cancelled');
        Alert.alert('Facebook Login', 'Login was cancelled.');
        setLoading(false); // Stop loading
        return;
      }
       // Fetch the current access token
       const data = await AccessToken.getCurrentAccessToken();
       if (!data) {
         throw new Error('Something went wrong obtaining access token');
       }
       console.log('Access Token:', data.accessToken.toString());
 
       // Simulate a small delay to handle the async flow better
       setTimeout(() => {
         // Navigate to Home (or other screen)
         navigation.navigate('Home');
       }, 500);
    } catch (error) {
      console.log('Login failed with error:', error);
      Alert.alert('Facebook Login Error', `An error occurred: ${error}`, [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  const githubLogin = async () => {
    // base config
    const config = {
      clientId: 'Ov23liqUiopaWzONUxL7',
      clientSecret: '710fcb19666f6af7aa903c5144c951ea8a2c2248',
      redirectUrl: 'com.deeplinkingapp://',
      scopes: ['user', 'repo'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
        revocationEndpoint:
          'https://github.com/settings/connections/applications/Ov23liqUiopaWzONUxL7',
      },
    };
    // use the client to make the auth request and receive the authState
    try {
      const result = await authorize(config);
      console.log("Acess Token:- ",result.accessToken);
      
      // result includes accessToken, accessTokenExpirationDate and refreshToken
    } catch (error) {
      console.log('error---', error);
      Alert.alert('GitHub Login Error', `An error occurred: ${error}`, [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };
  return (
    <View style={{margin: 20, gap: 20}}>
      <TouchableOpacity onPress={googleLogin}>
        <View style={styles.loginButton}>
          <View style={{marginLeft: 5}}>
            <Text style={{color: '#fff', fontWeight: '600', fontSize: 18}}>
              Login with Google
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={facebookLogin}>
        <View style={styles.loginButton}>
          <View style={{marginLeft: 5}}>
            <Text style={{color: '#fff', fontWeight: '600', fontSize: 18}}>
              Login with Facebook
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={githubLogin}>
        <View style={styles.loginButton}>
          <View style={{marginLeft: 5}}>
            <Text style={{color: '#fff', fontWeight: '600', fontSize: 18}}>
              Login with Github
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth - 50,
    height: 48,
    backgroundColor: '#DB3022',
    padding: 12,
    borderRadius: 25,
  },
});

export default Login;
