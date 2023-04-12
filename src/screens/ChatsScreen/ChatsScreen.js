import { FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import ChatListItem from "../../components/ChatListItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listChatRooms } from "./queries";

const ChatsScreen = () => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      const response = await API.graphql(
        graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
      );

      const rooms = response.data?.getUser?.ChatRooms?.items || [];
      const sortedRooms = rooms.sort(
        (r1, r2) =>
          new Date(r2.chatRoom.updatedAt) - new Date(r1.chatRoom.updatedAt)
      );

      setChatRooms(sortedRooms);
    };

    fetchChatRooms();
  }, []);

  return (
    <FlatList
      data={chatRooms}
      renderItem={({ item }) => <ChatListItem chat={item.chatRoom} />}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F7FB",
    paddingHorizontal: 14,
    paddingTop: 4,
  },
});

export default ChatsScreen;
