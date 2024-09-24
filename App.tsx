/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RootNavigation from './src/navigation/RootNavigation';
import Biometric from './src/components/Biometric';

function App(): React.JSX.Element {
  return (
    <>
      <Biometric />
      <RootNavigation />
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    color: '#000',
  },
});

export default App;
