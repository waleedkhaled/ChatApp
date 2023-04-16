import React, { useState, useEffect } from "react";
import { FlatList, View, TextInput, StyleSheet, Button } from "react-native";
import ContactListItem from "../components/ContactListItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import { createChatRoom, createUserChatRoom } from "../graphql/mutations";

import { useNavigation } from "@react-navigation/native";

const ContactsScreen = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [name, setName] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then((result) => {
      setUsers(result.data?.listUsers?.items);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Create"
          disabled={!name || selectedUserIds.length < 1}
          onPress={onCreateGroupPress}
          color={"#3633DA"}
        />
      ),
    });
  }, [name, selectedUserIds]);

  const onCreateGroupPress = async () => {
    // Create a new Chatroom
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: { name } })
    );
    if (!newChatRoomData.data?.createChatRoom) {
      console.log("Error creating the chatroom");
    }
    const newChatRoom = newChatRoomData.data?.createChatRoom;

    // Add the selected users to the ChatRoom

    await Promise.all(
      selectedUserIds.map((userId) =>
        API.graphql(
          graphqlOperation(createUserChatRoom, {
            input: { chatRoomId: newChatRoom.id, userId },
          })
        )
      )
    );

    // Add the auth user to the ChatRoom
    const authUser = await Auth.currentAuthenticatedUser();
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomId: newChatRoom.id, userId: authUser.attributes.sub },
      })
    );

    setSelectedUserIds([]);
    setName("");
    // navigate to the newly created ChatRoom
    navigation.navigate("Chat", { id: newChatRoom.id });
  };

  const onContactPress = (id) => {
    setSelectedUserIds((userIds) => {
      if (userIds.includes(id)) {
        // remove id from selected
        return [...userIds].filter((uid) => uid !== id);
      } else {
        // add id to selected
        return [...userIds, id];
      }
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Group name"
        placeholderTextColor="#a1a1aa"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <ContactListItem
            user={item}
            selectable
            onPress={() => onContactPress(item.id)}
            isSelected={selectedUserIds.includes(item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fafafa" },
  input: {
    borderBottomWidth: 0.6,
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
    padding: 12,
    margin: 10,
    color: "#27272a",
    fontSize: 17,
    fontFamily: "Antarctica"
  },
});

export default ContactsScreen;
