import React, { useState, useEffect, useContext } from "react";
import { FlatList, View, TextInput, StyleSheet, Button } from "react-native";
import ContactListItem from "../components/ContactListItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import { createChatRoom, createUserChatRoom } from "../graphql/mutations";
import { useNavigation } from "@react-navigation/native";
import themeContext from "../config/themeContext";

const ContactsScreen = () => {
  const theme = useContext(themeContext);
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
          color={theme.mainColor}
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
    <View
      style={{
        height: "100%",
        backgroundColor: theme.darkerBgColor,
        borderBottomWidth: theme.borderWidth,
        borderBottomColor: theme.borderColor,
      }}
    >
      <TextInput
        placeholder="Group name"
        placeholderTextColor={theme.subtitleColor}
        value={name}
        onChangeText={setName}
        style={[styles.input, { color: theme.textColor }]}
        selectionColor={theme.mainColor}
      />
      <FlatList
        data={users}
        style={styles.contacts}
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
  input: {
    borderBottomWidth: 0.6,
    borderBottomColor: "rgba(250, 250, 250, 0.2)",
    padding: 12,
    margin: 10,
    color: "#27272a",
    fontSize: 17,
    fontFamily: "Inter-Medium",
  },
  contacts: {
    marginTop: -10,
  },
});

export default ContactsScreen;
