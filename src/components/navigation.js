import React , {useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import User from '../screens/user';
import Manager from '../screens/manager';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../screens/profile';

const Tab = createBottomTabNavigator();

function NavigationFunc() {

  return (
    <NavigationContainer>
    <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Dashboard") {
              iconName = focused ? "person" : "person";
            } else if (route.name === "Manager") {
              iconName = focused
                ? "briefcase"
                : "briefcase";
            }
            else if (route.name === "Profile") {
                iconName = focused
                  ? "apps"
                  : "apps";
              }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "blue",
        })}>      
      <Tab.Screen name="Dashboard" component={User} />
      <Tab.Screen name="Manager" component={Manager} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default NavigationFunc;