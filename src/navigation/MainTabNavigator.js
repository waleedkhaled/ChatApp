import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotImplementedScreen from "../screens/NotImplementedScreen";
import ChatScreens from "../screens/ChatScreens";
import ChatScreen from "../screens/ChatScreen";
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import SettingsScreen from "../screens/SettingsScreen";
import { Ionicons, Entypo } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Chats"
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
          height: 80,
          borderBottomWidth: .6,
          borderBottomColor: "rgba(0, 0, 0, 0.2)",
        },
        headerTitleStyle: {
          fontFamily: "Antarctica",
          fontSize: 22,
          fontWeight: "800",
          color: "#242C34",
        },
        headerTitleAlign: 'center',
        tabBarStyle: {
          backgroundColor: "white",
          height: 80,
          paddingBottom: 12,
          paddingTop: 14,
          borderTopWidth: .6,
          borderTopColor: "rgba(0, 0, 0, 0.2)"
        },
        tabBarInactiveTintColor: "#aaa",
        tabBarActiveTintColor: "#007AFF",
        tabBarLabelStyle: {
          fontFamily: "Antarctica",
          fontSize: 12
        }
      }}
    >
      <Tab.Screen name="Status" component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="shield-alert-outline" size={28} color={color} />),
        }} />
      <Tab.Screen name="Calls" component={NotImplementedScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (<Ionicons name="call-outline" size={28} color={color}
        />)
      }} />
      <Tab.Screen name="Camera" component={NotImplementedScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (<Ionicons name="camera-outline" size={28} color={color}
        />)
      }} />
      <Tab.Screen name="Chats" component={ChatScreens} options={({ navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name="chatbubbles-outline" size={28} color={color} />
        ),
        headerRight: () => (
          <Entypo
            onPress={() => navigation.navigate('Contacts')}
            name="new-message"
            size={20}
            color={"#007AFF"}
            style={{ marginRight: 15 }}
          />

        )
      })} />
      <Tab.Screen name="Settings" component={NotImplementedScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (<Ionicons name="settings-outline" size={28} color={color}
        />)
      }} />
    </Tab.Navigator>
  )
}

export default MainTabNavigator;