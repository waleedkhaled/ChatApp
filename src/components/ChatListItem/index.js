import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

dayjs.extend(relativeTime);

const ChatListItem = ({ chat }) => {
  const navigation = useNavigation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      // Loop through chat.users.items and find a user that is not us (Authenticated user)
      const userItem = chat.users.items.find(
        (item) => item.user.id !== authUser.attributes.sub
      );
      setUser(userItem?.user);
    };

    fetchUser();
  }, []);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Chat", { id: chat.id, name: user?.name })
      }
      style={styles.container}
    >
      <Image source={{ uri: user?.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {user?.name}
          </Text>
          <Text style={styles.subTitle}>
            {dayjs(chat.lastMessage?.createdAt).fromNow(true)}
          </Text>
        </View>
        <Text style={styles.subTitle} numberOfLines={1}>
          {chat.lastMessage?.text}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
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
    flexDirection: "row",
    marginBottom: 2,
  },
  name: {
    flex: 1,
    color: "#242C34",
    fontFamily: "Antarctica",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 2,
  },
  subTitle: {
    color: "#999999",
    fontFamily: "Antarctica",
    fontSize: 14,
    maxWidth: 420,
  },
});

export default ChatListItem;
