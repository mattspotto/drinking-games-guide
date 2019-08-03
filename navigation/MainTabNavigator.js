import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Colors from '../constants/Colors';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import GameDetailScreen from '../screens/GameDetailScreen';
import FavouritesScreen from '../screens/FavouritesScreen';

export const defaultNavigationProps = {
  headerTintColor: Colors.tintColor,
  headerTitleStyle: {
    color: Colors.tintColor
  },
  headerStyle: {
    backgroundColor: Colors.b2,
    paddingVertical: 12,
    borderBottomColor: Colors.secondaryBorder
  }
};

export const homeNavigationProps = {
  headerStyle: {
    backgroundColor: Colors.b2,
    borderBottomColor: Colors.b2,
    paddingVertical: 0
  }
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  GameDetail: GameDetailScreen,
}, {
  defaultNavigationOptions: homeNavigationProps
});

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-information-circle${focused ? '' : '-outline'}`
            : 'md-information-circle'
        }
      />
    ),
  };
};

const FavouritesStack = createStackNavigator({
  Favourites: FavouritesScreen
});

FavouritesStack.navigationOptions = {
  tabBarLabel: 'Favourites',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  FavouritesStack,
}, {
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: Colors.b2,
    },
  }
});
