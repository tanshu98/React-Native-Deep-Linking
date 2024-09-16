import React, {useEffect} from 'react';
import {
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

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Login = ({navigation}: any) => {
  const webClientId =
    '1030970755549-jrp3lom0vi2mb58chqriagn2meihmke7.apps.googleusercontent.com';

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: webClientId,
    });
  });

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      navigation.navigate('Home');
    } catch (error) {
      if (error === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
      } else if (error === statusCodes.IN_PROGRESS) {
        console.log(error);
      } else if (error === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
      } else {
        return -1;
      }
    }
  };
  return (
    <View style={{margin: 20}}>
      <TouchableOpacity onPress={googleLogin}>
        <View style={styles.loginButton}>
          <View style={{marginLeft: 5}}>
            <Text style={{color: '#fff', fontWeight: '600', fontSize: 18}}>
              Login with Google
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
