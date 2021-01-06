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
      activeColor="#e91e63"
      style={{backgroundColor: 'tomato'}}>
      <Tab.Screen
        name="Feed"
        component={Order}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Customer}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Items}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainBottomTabScreen;
