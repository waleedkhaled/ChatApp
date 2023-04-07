import { View, Text, ImageBackground, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import messages from '../../assets/data/messages.json'
import Message from '../components/Message'
import InputBox from '../components/InputBox'


const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params.name])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 90}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <Message message={item} />}
          style={styles.list}
        />
        <InputBox />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    // paddingVertical: 12,
    // paddingTop: 16,
  }
})

export default ChatScreen