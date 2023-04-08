import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { Auth } from "aws-amplify"

const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button 
        onPress={() => Auth.signOut()} 
        title='Sign Out'
        color="#007AFF" 
      />
    </View>
  )
}

export default SettingsScreen