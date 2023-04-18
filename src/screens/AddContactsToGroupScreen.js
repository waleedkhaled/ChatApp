import React, { useState, useEffect, useContext } from "react";
import { FlatList, View, TextInput, StyleSheet, Button } from "react-native";
import ContactListItem from "../components/ContactListItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import { createChatRoom, createUserChatRoom } from "../graphql/mutations";
import { useNavigation, useRoute } from "@react-navigation/native";
import themeContext from "../config/themeContext";

const ContactsScreen = () => {
  const theme = useContext(themeContext);
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const chatRoom = route.params.chatRoom;

  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then((result) => {
      setUsers(
        result.data?.listUsers?.items.filter(
          (item) =>
            !chatRoom.users.items.some(
              (chatRoomUser) =>
                !chatRoomUser._deleted && item.id === chatRoomUser.userId
            )
        )
      );
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Invite"
          disabled={selectedUserIds.length < 1}
          onPress={onAddToGroupPress}
          color={theme.mainColor}
        />
      ),
    });
  }, [selectedUserIds]);

  const onAddToGroupPress = async () => {
    // Add the selected users to the ChatRoom

    await Promise.all(
      selectedUserIds.map((userID) =>
        API.graphql(
          graphqlOperation(createUserChatRoom, {
            input: { chatRoomId: chatRoom.id, userId: userID },
          })
        )
      )
    );

    setSelectedUserIds([]);
    // navigate to the newly created ChatRoom
    navigation.goBack();
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
    <View style={{
      height: "100%",
      backgroundColor: theme.darkerBgColor,
    }}>
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

export default ContactsScreen;
