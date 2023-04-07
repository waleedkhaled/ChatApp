import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const InputBox = () => {

    const [newMessage, setNewMessage] = useState('');
    const onSend = () => {
        console.warn('sending a new message', newMessage);
        setNewMessage('');
    }

    return (
        <View style={styles.container}>
            {/* Icon */}
            <AntDesign name="plus" size={24} color="#007AFF" />

            {/* Text Input */}
            <TextInput
                value={newMessage}
                onChangeText={setNewMessage}
                style={styles.input}
                placeholder="type your message..."
            />

            {/* Icon */}
            <MaterialIcons onPress={onSend} style={styles.send} name="send" size={18} color="white" />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        // width: "100%",
        // bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',

        padding: 12,
        paddingHorizontal: 16,
        borderTopWidth: .6, borderTopColor: "rgba(0, 0, 0, 0.2)"
    },
    input: {
        fontFamily: "Antarctica",
        fontSize: 15,
        flex: 1,
        backgroundColor: '#F5F7FB',
        height: 40,
        padding: 5,
        paddingHorizontal: 12,
        marginHorizontal: 10,
        borderRadius: 50,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: .6
    },
    send: {
        backgroundColor: '#007AFF',
        padding: 9,
        width: 36,
        height: 36,
        borderRadius: 18,
        display: 'flex',
        overflow: 'hidden',
    },

})
export default InputBox