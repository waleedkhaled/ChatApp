import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, {  useState } from 'react'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'

const InputBox = () => {

    const [newMessage, setNewMessage] = useState('');
    const onSend = () => {
        console.warn('sending a new message', newMessage);
        setNewMessage('');
    }

    return (
        <View styles={styles.container}>

            <AntDesign name='plus' size={24} color='royalblue' />

            <TextInput
             value={newMessage}
             style={styles.input}
             onChangeText={setNewMessage}
              placeholder='type your message...' />

            <MaterialIcons onPress={onSend} style={styles.sendButton} name='send' size={24} color='white' />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'whitesmoke',
        padding: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: 'white',
        padding: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderRadius: 50,
        borderColor: 'lightGray',
        borderWidth: StyleSheet.hairlineWidth

    },
    send: {
        backgroundColor:'royalblue',
        padding: 7,
        borderRadius: 15,
        overflow: 'hidden'
    }

})
export default InputBox