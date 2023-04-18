import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React, { useContext } from "react";
import ChatScreen from "../screens/ChatScreen";
import ChatsScreen from "../screens/ChatsScreen/ChatsScreen";
import ContactsScreen from "../screens/ContactsScreen";
import NewGroupScreen from "../screens/NewGroupScreen";
import GroupInfoScreen from "../screens/GroupInfoScreen";
import AddContactsToGroupScreen from "../screens/AddContactsToGroupScreen";
import MainTabNavigator from "./MainTabNavigator";
import themeContext from "../config/themeContext";
import modeContext from "../config/modeContext";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    card: "#1D1C22",
  },
};

const Navigator = () => {
  const theme = useContext(themeContext);
  const mode = useContext(modeContext);

  return (
    <NavigationContainer theme={mode ? darkTheme : DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            // backgroundColor: theme.bgColor,
          },
          // headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Inter-SemiBold",
            fontSize: 22,
            color: theme.headerColor,
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
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
