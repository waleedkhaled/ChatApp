import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const Message = ({ message }) => {
    const isMyMessage = () => {
        return message.user.id === 'u1';
    }
    return (
        <View style={[styles.container, {
            alignSelf: isMyMessage() ? 'flex-start' : 'flex-end',
            backgroundColor: isMyMessage() ? 'white' : '#DCF8C5',
        }]}>
            <Text>{message.text}</Text>
            <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        
        elevation: 1,
    },
    time: {
        color: 'gray',
        alignSelf: 'flex-end',
        marginTop: 5,
    }
})
export default Message