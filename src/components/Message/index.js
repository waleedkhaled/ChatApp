import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react-native";
import ImageView from "react-native-image-viewing";

dayjs.extend(relativeTime);

const Message = ({ message }) => {
  const [isMe, setIsMe] = useState(false);
  const [imageSources, setImageSources] = useState([]);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);

  useEffect(() => {
    const isMyMessage = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      setIsMe(message.userID === authUser.attributes.sub);
    };

    isMyMessage();
  }, []);

  useEffect(() => {
    const downloadImages = async () => {
      if (message.images?.length > 0) {
        // TODO: change to support array of images
        const uri = await Storage.get(message.images[0]);
        setImageSources([{ uri }]);
      }
    };

    downloadImages();
  }, [message.images]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageContainer,
          {
            alignSelf: isMe ? "flex-end" : "flex-start",
            backgroundColor: isMe ? "#007AFF" : "white",
            borderBottomLeftRadius: isMe ? 16 : 3,
            borderBottomRightRadius: isMe ? 3 : 16,
          },
        ]}
      >
        {message.images?.length > 0 && (
          <>
            <Pressable onPress={() => setImageViewerVisible(true)}>
              <Image source={imageSources[0]} style={styles.image} />
            </Pressable>

            <ImageView
              images={imageSources}
              imageIndex={0}
              visible={imageViewerVisible}
              onRequestClose={() => setImageViewerVisible(false)}
            />
          </>
        )}
        <Text
          style={[
            styles.text,
            {
              color: isMe ? "white" : "#242C34",
            },
          ]}
        >
          {message.text}
        </Text>
      </View>
      <Text
        style={[
          styles.time,
          {
            alignSelf: isMe ? "flex-end" : "flex-start",
          },
        ]}
      >
        {dayjs(message.createdAt).fromNow(true)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  time: {
    color: "#bbb",
    marginHorizontal: 6,
    marginTop: 4,
  },
  messageContainer: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    maxWidth: "80%",
    shadowColor: "#242C34",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  text: {
    fontFamily: "Antarctica",
    fontSize: 16,
    lineHeight: 24,
  },
  image: {
    width: 200,
    height: 100,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
  },
});
export default Message;
