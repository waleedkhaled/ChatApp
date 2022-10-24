import { View, Text, ImageBackground, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import React, {useEffect} from 'react'
import bg from '../../assets/images/BG.png'
import messages from '../../assets/data/messages.json'
import Message from '../components/Message'
import InputBox from '../components/InputBox'


const ChatScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();

    useEffect(()=>{
        navigation.setOptions({title: route.params.name}); 
    }, [route.params.name])

  return (
    <KeyboardAvoidingView
    keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 90}
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