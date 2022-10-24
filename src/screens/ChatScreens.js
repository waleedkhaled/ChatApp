import { View, Text, FlatList  } from 'react-native'
import React from 'react'
import chats from '../../assets/data/chats.json'
import ChatListItem from '../components/ChatListItem'
const ChatScreen = () => {
  return (
    <FlatList
    data={chats}
    renderItem={({item})=><ChatListItem chat={item} />}
    />
  )
}

export default ChatScreen