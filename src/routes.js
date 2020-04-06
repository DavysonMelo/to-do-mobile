import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Photo from './pages/Photo';

export default function Routes() {
  return(
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen
          name="login"
          component={Login} 
        />

        <AppStack.Screen
          name="register"
          component={Register} 
        />

        <AppStack.Screen
          name="home"
          component={Home}
        />

        <AppStack.Screen
          name="camera"
          component={Photo}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}