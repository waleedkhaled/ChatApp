import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const ChatListItem = ({ chat }) => {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.navigate('Chat', { id: chat.id, name: chat.user.name })} style={styles.container}>
            <Image source={{ uri: chat.user.image }}
                style={styles.image} />
            <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={styles.name} numberOfLines={1}>{chat.user.name}</Text>
                    <Text style={styles.subTitle}>{dayjs(chat.lastMessage.createdAt).fromNow(true)}</Text>
                </View>
                <Text style={styles.subTitle} numberOfLines={1}>{chat.lastMessage.text}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 12,
    },
    image: {
        width: 66,
        height: 66,
        borderRadius: 33,
        marginRight: 10,
    },
    content: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 2
    },
    name: {
        flex: 1,
        color: '#242C34',
        fontFamily: "Antarctica",
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 2,

    },
    subTitle: {
        color: '#999999',
        fontFamily: "Antarctica",
        fontSize: 14,
        maxWidth: 420,
    },

})

export default ChatListItem;