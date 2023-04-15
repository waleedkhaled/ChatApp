import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import React from "react";
import ChatScreen from "../screens/ChatScreen";
import ChatsScreen from "../screens/ChatsScreen/ChatsScreen";
import ContactsScreen from "../screens/ContactsScreen";
import NewGroupScreen from "../screens/NewGroupScreen";
import GroupInfoScreen from "../screens/GroupInfoScreen";
import AddContactsToGroupScreen from "../screens/AddContactsToGroupScreen";
import MainTabNavigator from "./MainTabNavigator";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "white",
          },
          headerTitleStyle: {
            fontFamily: "Antarctica",
            fontSize: 22,
            fontWeight: "bold",
            color: "#242C34",
          },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Home"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Chats" component={ChatsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Group Info" component={GroupInfoScreen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="New Group" component={NewGroupScreen} />
        <Stack.Screen
          name="Add Contacts"
          component={AddContactsToGroupScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
