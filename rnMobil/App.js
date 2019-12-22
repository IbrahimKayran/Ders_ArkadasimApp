import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoadingScreen from "./src/screens/LoadingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import AddingScreen from "./src/screens/AddingScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import EditMail from "./src/screens/EditMail";
import EditName from "./src/screens/EditName";

import FirebaseConfig from './components/FirebaseConfig';

<FirebaseConfig />

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Search: SearchScreen,
    Settings: SettingsScreen,
    Adding: AddingScreen,
    EditMail: EditMail,
    EditName: EditName,
    Login: LoginScreen,
  },
);

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
});

  export default createAppContainer(
    createSwitchNavigator(
      {
        Loading: LoadingScreen,
        App: AppStack,
        Auth: AuthStack
      },
      {
        initialRouteName: "Loading",
      }
    )
  );
  
