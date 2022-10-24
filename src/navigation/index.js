import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text } from 'react-native'
import React from 'react'
import ChatScreen from '../screens/ChatScreen'
import ChatScreens from '../screens/ChatScreens'
import MainTabNavigator from './MainTabNavigator'

const Stack = createNativeStackNavigator();

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: 'whitesmoke'}}}>
                <Stack.Screen name='Home' component={MainTabNavigator} options={{headerShown: false}}/> 
                <Stack.Screen name='Chats' component={ChatScreens} />
                <Stack.Screen name='Chat' component={ChatScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator