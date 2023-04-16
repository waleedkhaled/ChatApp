import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotImplementedScreen from "../screens/NotImplementedScreen";
import ChatsScreen from "../screens/ChatsScreen/ChatsScreen";
import ChatScreen from "../screens/ChatScreen";
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        headerStyle: {
          height: 80,
          backgroundColor: "#fafafa",
        },
        headerShadowVisible: false,
        headerBackgroundContainerStyle: {
          borderBottomWidth: 0.8,
          borderBottomColor: "rgba(0, 0, 0, 0.1)",
        },
        headerTitleStyle: {
          fontFamily: "Antarctica",
          fontSize: 24,
          fontWeight: "800",
          color: "#27272a",
        },
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: "#fafafa",
          height: 80,
          paddingBottom: 12,
          paddingTop: 14,
        },
        tabBarInactiveTintColor: "#a1a1aaab",
        tabBarActiveTintColor: "#3633DA",
        tabBarLabelStyle: {
          fontFamily: "Antarctica",
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
              color={"#3633DA"}
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