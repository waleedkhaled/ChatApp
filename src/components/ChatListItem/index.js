import { Text, View, Image, StyleSheet } from "react-native";

const ChatListItem = () => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg' }}
                style={styles.image} />
            <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={styles.name} numberOfLines={1}>Lukas</Text>
                    <Text style={styles.subTitle}>8:30</Text>
                </View>
                <Text style={styles.subTitle} numberOfLines={2}>Hello there!</Text>
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