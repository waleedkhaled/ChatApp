import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { SafeAreaView } from 'react-native-safe-area-context';
dayjs.extend(relativeTime);

const Message = ({ message }) => {
    const isMyMessage = () => {
        return message.user.id === 'u1';
    }
    return (
        <View style={styles.container}>
            <View style={[styles.messageContainer, {
                alignSelf: isMyMessage() ? 'flex-start' : 'flex-end',
                backgroundColor: isMyMessage() ? 'white' : '#007AFF',
                borderBottomLeftRadius: isMyMessage() ? 3 : 16,
                borderBottomRightRadius: isMyMessage() ? 16 : 3
            }]}>
                <Text style={[styles.text, {
                    color: isMyMessage() ? "#242C34" : "white"
                }]}>{message.text}</Text>
            </View>
            <Text style={[styles.time, {
                alignSelf: isMyMessage() ? 'flex-start' : "flex-end"
            }]}>{dayjs(message.createdAt).fromNow(true)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
    },
    time: {
        color: '#bbb',
        marginHorizontal: 6,
        marginTop: 4,
    },
    messageContainer: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 16,
        maxWidth: '80%',
        shadowColor: "#242C34",
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: .18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    text: {
        fontFamily: "Antarctica",
        fontSize: 16,
        lineHeight: 24
    },
})
export default Message