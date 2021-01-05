import React from 'react';
import {View, Text} from 'react-native';
import Login from './screens/components/Login';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainMenue from './screens/MainMenue';
import Order from './screens/Order';
import {StateProvider} from './central_state_mgt/StateProvider';
import reducer, {initialState} from './central_state_mgt/Reducer';
import Customer from './screens/Customer';
import Items from './screens/Item';

const Stack = createStackNavigator();
const App = () => {
  return (
    <StateProvider initstate={initialState} reducer={reducer}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="MainMenue"
            component={MainMenue}
            options={{title: 'Main Menue'}}
          />
          <Stack.Screen name="Order" component={Order} />
          <Stack.Screen name="Customer" component={Customer} />
        </Stack.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
};

export default App;
