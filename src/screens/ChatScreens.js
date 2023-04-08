import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import chats from '../../assets/data/chats.json'
import ChatListItem from '../components/ChatListItem'

const ChatScreens = () => {
  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => <ChatListItem chat={item} />}
      style={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F7FB',
    paddingHorizontal: 14,
    paddingTop: 4,
  }
})

export default ChatScreens