import React from 'react';
import {View, Text} from 'react-native';
import Login from './screens/components/Login';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StateProvider} from './central_state_mgt/StateProvider';
import reducer, {initialState} from './central_state_mgt/Reducer';
import MainBottomTabScreen from './screens/MainBottomTabScreen';
import Dashboard from './screens/Dashboard';
import ViewOrderForm from './screens/components/ViewOrderForm';

const Stack = createStackNavigator();
const App = () => {
  return (
    <StateProvider initstate={initialState} reducer={reducer}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Dashboard} />
          <Stack.Screen name="MainScreen" component={MainBottomTabScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
};

export default App;
