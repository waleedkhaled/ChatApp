import { Text, View, Image, StyleSheet } from "react-native";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const ChatListItem = ({ chat }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: chat.user.image }}
                style={styles.image} />
            <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={styles.name} numberOfLines={1}>{chat.user.name}</Text>
                    <Text style={styles.subTitle}>{dayjs(chat.lastMessage.createdAt).fromNow(true)}</Text>
                </View>
                <Text style={styles.subTitle} numberOfLines={2}>{chat.lastMessage.text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 10,
        height: 70
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10
    },
    content: {
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'grey'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5
    },
    name: {
        flex:1,
        fontWeight: 'bold'
    },
    subTitle: {
        color: 'grey'
    },

})

export default ChatListItem;