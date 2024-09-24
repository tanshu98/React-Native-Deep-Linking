import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import CameraRoll from '../Bottom Tabs/Camera';
import Files from '../Bottom Tabs/Files';
import Downloads from '../Bottom Tabs/Downloads';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/Foundation';

import IconOutlined from 'react-native-vector-icons/Ionicons';
import IconOutlined2 from 'react-native-vector-icons/Octicons';
import IconOutlined3 from 'react-native-vector-icons/Foundation';


const Tab = createMaterialBottomTabNavigator();

const DetailsScreen = () => {
  return (
    <Tab.Navigator shifting={true}>
    <Tab.Screen name='CameraRoll' component={CameraRoll}
  options={{
    tabBarIcon: ({ color, focused }) => (
      focused ? 
      <Icon name="images-sharp" size={25} color={"red"} /> : 
      <IconOutlined name="images-outline" size={25} color={color} />
    )
  }} 
/>
    <Tab.Screen name='Files' component={Files}
    options={{
      tabBarIcon: ({ color, focused }) => (
        focused ? 
        <Icon2 name="file-directory" size={25} color={"red"} /> : 
        <IconOutlined2 name="file-directory" size={25} color={color} />
      )
    }}
    />
    <Tab.Screen name='Downloads' component={Downloads}
    options={{
      tabBarIcon: ({ color, focused }) => (
        focused ? 
        <Icon3 name="download" size={25} color={"red"} /> : 
        <IconOutlined3 name="download" size={25} color={color} />
      )
    }}
    />
</Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsScreen;
