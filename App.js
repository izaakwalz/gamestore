import * as React from 'react';
import styled from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import LiveScreen from './screens/LiveScreen';
import ProfileScreen from './screens/ProfileScreen';
import GameScreen from './screens/GameScreen';

const AppStack = createStackNavigator();
const TabNav = createBottomTabNavigator();

const tabBarOptions = {
  showLabel: false,
  style: {
    backgroundColor: '#343434',
    borderTopColor: '#343434',
    paddingBottom: 12,
  },
};

const TabNavScreen = () => {
  return (
    <TabNav.Navigator
      tabBarOptions={tabBarOptions}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case 'HomeScreen':
              iconName = 'home';
              break;

            case 'LiveScreen':
              iconName = 'game-controller';
              break;

            case 'ProfileScreen':
              iconName = 'user';
              break;

            default:
              iconName = 'home';
              break;
          }

          return (
            <TabBarIconContainer focused={focused}>
              <Entypo name={iconName} size={24} color='#ffff' />
            </TabBarIconContainer>
          );
        },
      })}
    >
      <TabNav.Screen name='HomeScreen' component={HomeScreen} />
      <TabNav.Screen name='LiveScreen' component={LiveScreen} />
      <TabNav.Screen name='ProfileScreen' component={ProfileScreen} />
    </TabNav.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AppStack.Navigator mode='modal' headerMode='none'>
        <AppStack.Screen name='App' component={TabNavScreen} />
        <AppStack.Screen name='GameScreen' component={GameScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

const TabBarIconContainer = styled.View`
  background-color: ${(props) => (props.focused ? '#819ee5' : '#343434')};
  padding: 2px 16px;
  margin-top: 5px;
  border-radius: 32px;
`;
