import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text } from 'react-native'
import React from 'react'
import ChatScreen from '../screens/ChatScreen'
import ChatScreens from '../screens/ChatScreens'
import ContactsScreen from '../screens/ContactsScreen';
import MainTabNavigator from './MainTabNavigator'

const Stack = createNativeStackNavigator();

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: "white",
                },
                headerTitleStyle: {
                    fontFamily: "Antarctica",
                    fontSize: 22,
                    fontWeight: "bold",
                    color: "#242C34",
                },
                headerTitleAlign: 'center',
            }}>
                <Stack.Screen name='Home' component={MainTabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name='Chats' component={ChatScreens} />
                <Stack.Screen name='Chat' component={ChatScreen} />
                <Stack.Screen name="Contacts" component={ContactsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator