import { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, Pressable, Text } from "react-native";
import ContactListItem from "../components/ContactListItem";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import { createChatRoom, createUserChatRoom } from "../graphql/mutations";
import { getCommonChatRoomWithUser } from "../services/chatRoomService";
import themeContext from "../config/themeContext";

const ContactsScreen = () => {
  const theme = useContext(themeContext);

  const [users, setUsers] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then((result) => {
      setUsers(result.data?.listUsers?.items);
    });
  }, []);

  const createAChatRoomWithTheUser = async (user) => {
    // Check if we already have a ChatRoom with user
    const existingChatRoom = await getCommonChatRoomWithUser(user.id);
    if (existingChatRoom) {
      console.log("Chatroom already exists ", existingChatRoom);
      navigation.navigate("Chat", { id: existingChatRoom.chatRoom.id });
      return;
    }

    // Create a new Chatroom
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    );
    if (!newChatRoomData.data?.createChatRoom) {
      console.log("Error creating the chatroom");
    }
    const newChatRoom = newChatRoomData.data?.createChatRoom;

    // Add the clicked user to the ChatRoom
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomId: newChatRoom.id, userId: user.id },
      })
    );

    // Add the auth user to the ChatRoom
    const authUser = await Auth.currentAuthenticatedUser();
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomId: newChatRoom.id, userId: authUser.attributes.sub },
      })
    );

    // navigate to the newly created ChatRoom
    navigation.navigate("Chat", { id: newChatRoom.id });
  };

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <ContactListItem
          user={item}
          onPress={() => createAChatRoomWithTheUser(item)}
        />
      )}
      style={[styles.container, {backgroundColor: theme.darkerBgColor}]}
      ListHeaderComponent={() => (
        <Pressable
          onPress={() => {
            navigation.navigate("New Group");
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 18,
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <FontAwesome
            name="users"
            size={18}
            color={theme.mainColor}
            style={{
              marginRight: 12,
              backgroundColor: theme.newGroup,
              padding: 10,
              borderRadius: 20,
              overflow: "hidden",
            }}
          />
          <Text
            style={{ fontFamily: "Inter-Medium", color: theme.mainColor, fontSize: 16 }}
          >
            New Group
          </Text>
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 4,
  },
});

export default ContactsScreen;
