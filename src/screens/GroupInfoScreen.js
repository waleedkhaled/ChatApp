import { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";

import { API, graphqlOperation } from "aws-amplify";
import { onUpdateChatRoom } from "../graphql/subscriptions";
import ContactListItem from "../components/ContactListItem";

const ChatRoomInfo = () => {
  const [chatRoom, setChatRoom] = useState(null);
  const route = useRoute();

  const chatroomID = route.params.id;

  useEffect(() => {
    API.graphql(graphqlOperation(getChatRoom, { id: chatroomID })).then(
      (result) => {
        setChatRoom(result.data?.getChatRoom);
      }
    );
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

  if (!chatRoom) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{chatRoom.name}</Text>

      <Text style={styles.sectionTitle}>
        {chatRoom.users.items.length} Participants
      </Text>
      <View style={styles.section}>
        <FlatList
          data={chatRoom.users.items}
          renderItem={({ item }) => <ContactListItem user={item.user} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    marginTop: 8,
  },
  title: {
    fontFamily: "Antarctica",
    fontWeight: "bold",
    fontSize: 30,
    color: "#242C34",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#aaa",
    marginTop: 2,
    marginBottom: 16,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 5,
    marginVertical: 10,
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
