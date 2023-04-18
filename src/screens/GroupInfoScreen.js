import { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { API, graphqlOperation } from "aws-amplify";
import { onUpdateChatRoom } from "../graphql/subscriptions";
import { deleteUserChatRoom } from "../graphql/mutations";
import ContactListItem from "../components/ContactListItem";
import themeContext from "../config/themeContext";

const ChatRoomInfo = () => {
  const theme = useContext(themeContext);

  const [chatRoom, setChatRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();

  const chatroomID = route.params.id;

  const fetchChatRoom = async () => {
    setLoading(true);
    const result = await API.graphql(
      graphqlOperation(getChatRoom, { id: chatroomID })
    );
    setChatRoom(result.data?.getChatRoom);
    setLoading(false);
  };

  useEffect(() => {
    fetchChatRoom();

    // Subscribe to onUpdateChatRoom
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, {
        filter: { id: { eq: chatroomID } },
      })
    ).subscribe({
      next: ({ value }) => {
        setChatRoom((cr) => ({
          ...(cr || {}),
          ...value.data.onUpdateChatRoom,
        }));
      },
      error: (error) => console.warn(error),
    });

    // Stop receiving data updates from the subscription
    return () => subscription.unsubscribe();
  }, [chatroomID]);

  const removeChatRoomUser = async (chatRoomUser) => {
    await API.graphql(
      graphqlOperation(deleteUserChatRoom, {
        input: { _version: chatRoomUser._version, id: chatRoomUser.id },
      })
    );
  };

  const onContactPress = (chatRoomUser) => {
    Alert.alert(
      "Removing the user",
      `Are you sure you want to remove ${chatRoomUser.user.name} from this group`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => removeChatRoomUser(chatRoomUser),
        },
      ]
    );
  };

  if (!chatRoom) {
    return <ActivityIndicator />;
  }

  const users = chatRoom.users.items.filter((item) => !item._deleted);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.darkerBgColor,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: theme.headerColor,
          },
        ]}
      >
        {chatRoom.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 6,
          marginBottom: 2,
          paddingHorizontal: 16,
        }}
      >
        <Text style={[styles.sectionTitle, { color: theme.subtitleColor }]}>
          {users.length} Participants
        </Text>
        <Text
          onPress={() => navigation.navigate("Add Contacts", { chatRoom })}
          style={[styles.invite, { color: theme.mainColor }]}
        >
          Invite Friends
        </Text>
      </View>
      <View
        style={[
          styles.section,
          {
            borderTopColor: theme.subtitleColor,
          },
        ]}
      >
        <FlatList
          data={users}
          style={styles.contacts}
          renderItem={({ item }) => (
            <ContactListItem
              user={item.user}
              onPress={() => onContactPress(item)}
            />
          )}
          onRefresh={fetchChatRoom}
          refreshing={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 28,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    flex: 1,
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  section: {
    marginVertical: 10,
    borderTopWidth: 0.6,
    borderTopColor: "rgba(0, 0, 0, 0.2)",
  },
  invite: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
});

export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      updatedAt
      name
      users {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          user {
            id
            name
            status
            image
          }
        }
        nextToken
        startedAt
      }
      createdAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
    }
  }
`;

export default ChatRoomInfo;
