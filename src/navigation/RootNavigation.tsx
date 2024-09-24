import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native';
import Login from '../components/Login';

const RootStack = createNativeStackNavigator();
const linking = {
  prefixes: ['peoplesapp://'],
};

const RootNavigation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer
        linking={linking}
        fallback={<ActivityIndicator color="blue" size="large" />}>
        <RootStack.Navigator>
          {/* <RootStack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
          /> */}
          {/* <RootStack.Screen
            options={{headerShown: false}}
            name="Home"
            component={HomeScreen}
          /> */}
          <RootStack.Screen
            options={{headerShown: false}}
            name="Details"
            component={DetailsScreen}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootNavigation;
