import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createMessage, updateChatRoom } from "../../graphql/mutations";

const InputBox = ({ chatroom }) => {
  const [text, setText] = useState("");

  const onSend = async () => {
    const authUser = await Auth.currentAuthenticatedUser();

    const newMessage = {
      chatroomID: chatroom.id,
      text,
      userID: authUser.attributes.sub,
    };

    const newMessageData = await API.graphql(
      graphqlOperation(createMessage, { input: newMessage })
    );

    setText("");

    // set the new message as LastMessage of the ChatRoom
    await API.graphql(
      graphqlOperation(updateChatRoom, {
        input: {
          _version: chatroom._version,
          chatRoomLastMessageId: newMessageData.data.createMessage.id,
          id: chatroom.id,
        },
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* Icon */}
      <AntDesign name="plus" size={24} color="#007AFF" />

      {/* Text Input */}
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholder="Type your message..."
      />

      {/* Icon */}
      <MaterialIcons
        disabled={text.length === 0} //to prevent submitting an empty message
        onPress={onSend}
        style={styles.send}
        name="send"
        size={18}
        color="white"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    // width: "100%",
    // bottom: 0,
    flexDirection: "row",
    alignItems: "center",

    padding: 12,
    paddingHorizontal: 16,
    borderTopWidth: 0.6,
    borderTopColor: "rgba(0, 0, 0, 0.2)",
  },
  input: {
    fontFamily: "Antarctica",
    fontSize: 15,
    flex: 1,
    backgroundColor: "#F5F7FB",
    height: 40,
    padding: 5,
    paddingHorizontal: 12,
    marginHorizontal: 10,
    borderRadius: 50,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 0.6,
  },
  send: {
    backgroundColor: "#007AFF",
    padding: 9,
    width: 36,
    height: 36,
    borderRadius: 18,
    display: "flex",
    overflow: "hidden",
  },
});
export default InputBox;
