import { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { createMessage, updateChatRoom } from "../../graphql/mutations";
import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import themeContext from "../../config/themeContext";

const InputBox = ({ chatroom }) => {
  const theme = useContext(themeContext);

  const [text, setText] = useState("");
  const [images, setImages] = useState([]);

  const onSend = async () => {
    const authUser = await Auth.currentAuthenticatedUser();

    const newMessage = {
      chatroomID: chatroom.id,
      text,
      userID: authUser.attributes.sub,
    };

    if (images.length > 0) {
      newMessage.images = await Promise.all(images.map(uploadFile));
      setImages([]);
    }

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: true,
    });

    console.log(result);

    if (!result.cancelled) {
      if (result.selected) {
        // user selected multiple files
        setImages(result.selected.map((asset) => asset.uri));
      } else {
        setImages([result.uri]);
      }
    }
  };

  const uploadFile = async (fileUri) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const key = `${uuidv4()}.png`;

      await Storage.put(key, blob, {
        contentType: "image/png", // contentType is optional
      });
      return key;
    } catch (err) {
      console.log("Error uploading file:", err);
    }
  };

  return (
    <>
      {images.length > 0 && (
        <View style={styles.attachmentsContainer}>
          <FlatList
            data={images}
            horizontal
            renderItem={({ item }) => (
              <>
                <Image
                  source={{ uri: item }}
                  style={styles.selectedImage}
                  resizeMode="contain"
                />

                <MaterialIcons
                  name="highlight-remove"
                  onPress={() =>
                    setImages((existingImages) =>
                      existingImages.filter((img) => img !== item)
                    )
                  }
                  size={20}
                  color="gray"
                  style={styles.removeSelectedImage}
                />
              </>
            )}
          />
        </View>
      )}

      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.bgColor,
          },
        ]}
      >
        {/* Plus Icon */}
        <AntDesign onPress={pickImage} name="plus" size={28} color={theme.mainColor} />

        {/* Text Input */}
        <TextInput
          value={text}
          onChangeText={setText}
          style={[
            styles.input,
            {
              backgroundColor: theme.darkerBgColor,
              color: theme.textColor,
            },
          ]}
          placeholder="Type your message..."
          placeholderTextColor={theme.subtitleColor}
          selectionColor={theme.mainColor}
        />

        {/* Send Icon */}
        <FontAwesome
          disabled={text.length === 0} //to prevent submitting an empty message
          onPress={onSend}
          style={styles.send}
          name="send"
          size={17}
          color={theme.iconColor}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
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
    fontFamily: "Inter-Medium",
    fontSize: 15,
    flex: 1,
    height: 44,
    padding: 5,
    paddingHorizontal: 16,
    marginHorizontal: 10,
    borderRadius: 50,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 0.6,
  },
  send: {
    backgroundColor: "#3633DA",
    padding: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    display: "flex",
    overflow: "hidden",
  },
  attachmentsContainer: {
    alignItems: "flex-end",
  },
  selectedImage: {
    height: 100,
    width: 200,
    margin: 5,
  },
  removeSelectedImage: {
    position: "absolute",
    right: 10,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
});
export default InputBox;
