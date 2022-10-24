import { View, Text, ImageBackground, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import bg from '../../assets/images/BG.png'
import messages from '../../assets/data/messages.json'
import Message from '../components/Message'
import InputBox from '../components/InputBox'

const ChatScreen = () => {
  return (
    <KeyboardAvoidingView
    style={{flex: 1}}
     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <ImageBackground source={bg} style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({item})=><Message message={item}/>}
        style={styles.list}
      />
      <InputBox/>
    </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list:{
        padding: 10
    }
})

export default ChatScreen