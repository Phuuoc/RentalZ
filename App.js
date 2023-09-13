import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, TextInput, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ScreenStackHeaderLeftView } from 'react-native-screens';
import 'react-native-gesture-handler';
import Home  from './components/Home';
import Input from './components/Input';
import ViewAll from './components/ViewAll';
import Edit from './components/Edit';

const Stack = createStackNavigator();
const App =() =>{
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name='Home' component={Home} options={{ headershown: false}}/>
        <Stack.Screen name='Input' component={Input} options={{ headershown: false}}/>
        <Stack.Screen name='ViewAll' component={ViewAll} options={{ headershown: false}}/>
        <Stack.Screen name='Edit' component={Edit} options={{ headershown: false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
