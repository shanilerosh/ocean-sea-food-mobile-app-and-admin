import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Order from './Order';
import Customer from './Customer';
import Items from './Item';
import Icon from 'react-native-vector-icons/Feather';

const Tab = createMaterialBottomTabNavigator();

function MainBottomTabScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      Login
      activeColor="white"
      barStyle={{backgroundColor: '#2c3e50'}}>
      <Tab.Screen
        name="Feed"
        component={Order}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="shopping" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Customer"
        component={Customer}
        options={{
          tabBarLabel: 'Customer',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Items"
        component={Items}
        options={{
          tabBarLabel: 'Items',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="treasure-chest"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainBottomTabScreen;
