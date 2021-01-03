import React from 'react';
import {View, Text} from 'react-native';
import Login from './screens/components/Login';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainMenue from './screens/MainMenue';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="MainMenue"
          component={MainMenue}
          options={{title: 'Main Menue'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
