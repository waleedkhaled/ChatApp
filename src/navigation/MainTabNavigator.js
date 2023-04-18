import { useContext } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotImplementedScreen from "../screens/NotImplementedScreen";
import ChatsScreen from "../screens/ChatsScreen/ChatsScreen";
import ChatScreen from "../screens/ChatScreen";
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import SettingsScreen from "../screens/SettingsScreen";
import themeContext from "../config/themeContext";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const theme = useContext(themeContext);

  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        headerStyle: {
          height: 80,
          // backgroundColor: theme.bgColor,
        },
        headerShadowVisible: false,
        headerBackgroundContainerStyle: {
          // borderBottomWidth: theme.deviderBorderWidth,
          // borderBottomColor: theme.deviderBorderColor,
        },
        headerTitleStyle: {
          fontFamily: "Inter-Bold",
          fontSize: 24,
          color: theme.headerColor,
        },
        headerTitleAlign: "center",
        tabBarStyle: {
          // backgroundColor: theme.bgColor,
          height: 80,
          paddingBottom: 12,
          paddingTop: 14,
        },
        tabBarInactiveTintColor: theme.subtitleColor,
        tabBarActiveTintColor: theme.mainColor,
        tabBarLabelStyle: {
          fontFamily: "Inter-Medium",
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Status"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="shield-alert-outline"
              size={29}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calls"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="call-outline" size={29} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="camera-outline" size={29} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="chatbubbles-outline" size={29} color={color} />
          ),
          headerRight: () => (
            <Entypo
              onPress={() => navigation.navigate("Contacts")}
              name="new-message"
              size={22}
              color={theme.mainColor}
              style={{ marginRight: 18 }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="settings-outline" size={29} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;