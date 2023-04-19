import { useEffect, useState, useContext } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { onUpdateChatRoom } from "../../graphql/subscriptions";
import themeContext from "../../config/themeContext";
import Avatar from "../Avatar/Avatar";

dayjs.extend(relativeTime);

const ChatListItem = ({ chat }) => {
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const [chatRoom, setChatRoom] = useState(chat);

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      // Loop through chat.users.items and find a user that is not us (Authenticated user)
      const userItem = chatRoom.users.items.find(
        (item) => item?.user?.id !== authUser.attributes.sub
      );
      setUser(userItem?.user);
    };

    fetchUser();
  }, []);

  // fetch Chat Room
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, { filter: { id: { eq: chat.id } } })
    ).subscribe({
      next: ({ value }) => {
        setChatRoom((cr) => ({
          ...(cr || {}),
          ...value.data.onUpdateChatRoom,
        }));
      },
      error: (err) => console.warn(err),
    });

    return () => subscription.unsubscribe();
  }, [chat.id]);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Chat", { id: chatRoom?.id, name: user?.name })
      }
      style={styles.container}
    >
      <Avatar user={user} chatRoom={chatRoom} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text
            style={[styles.name, { color: theme.smallHeaderColor }]}
            numberOfLines={1}
          >
            {chatRoom.name || user?.name}
          </Text>
          {chatRoom.LastMessage && (
            <Text style={[styles.subTitle, { color: theme.subtitleColor }]}>
              {dayjs(chatRoom.LastMessage?.createdAt).fromNow(true)}
            </Text>
          )}
        </View>
        <Text
          style={[styles.subTitle, { color: theme.subtitleColor }]}
          numberOfLines={1}
        >
          {chatRoom.LastMessage?.text}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 2,
    paddingVertical: 10,
    alignItems: "center",
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
    fontFamily: "Inter-Bold",
    fontSize: 16,
    marginBottom: 2,
    textAlign: "left",
  },
  subTitle: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    textAlign: "left",
    maxWidth: 420,
  },
});

export default ChatListItem;
