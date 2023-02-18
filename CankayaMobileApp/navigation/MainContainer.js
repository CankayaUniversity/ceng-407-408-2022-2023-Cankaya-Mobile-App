import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//Screens
import Announcement from "./screens/Announcement";
import HomePage from "./screens/HomePage";
import Profile from "./screens/Profile";
import QR from "./screens/QR";
import Survey from "./screens/Survey";

// Screen names

const homeName = "Home";
const profileName = "Profile";
const qrName = "QR";
const announcement = "Announcement";
const surveyName = "Survey";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <Tab.Navigator
      initalRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#ffed02",
        tabBarInactiveTintColor: "white",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#373a4b",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === announcement) {
            iconName = focused ? "alert" : "alert-outline";
          } else if (rn === qrName) {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (rn === profileName) {
            iconName = focused ? "person" : "person-outline";
          } else if (rn === surveyName) {
            iconName = focused ? "list" : "list-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={homeName} component={HomePage} />
      <Tab.Screen name={announcement} component={Announcement} />
      <Tab.Screen name={qrName} component={QR} />
      <Tab.Screen name={profileName} component={Profile} />
      <Tab.Screen name={surveyName} component={Survey} />
    </Tab.Navigator>
  );
}
