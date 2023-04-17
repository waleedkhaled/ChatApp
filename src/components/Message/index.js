import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  useWindowDimensions,
} from "react-native";
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

  const { width } = useWindowDimensions();

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
        const uris = await Promise.all(message.images.map(Storage.get));
        setImageSources(uris.map((uri) => ({ uri })));
      }
    };

    downloadImages();
  }, [message.images]);

  const imageContainerWidth = width * 0.8 - 50;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageContainer,
          {
            alignSelf: isMe ? "flex-end" : "flex-start",
            backgroundColor: isMe ? "#3633DA" : "white",
            borderBottomLeftRadius: isMe ? 16 : 3,
            borderBottomRightRadius: isMe ? 3 : 16,
          },
        ]}
      >
        {imageSources.length > 0 && (
          <View style={[{ width: imageContainerWidth }, styles.images]}>
            {imageSources.map((imageSource) => (
              <Pressable
                key={imageSource.uri}
                style={[
                  styles.imageContainer,
                  imageSources.length === 1 && { flex: 1 },
                ]}
                onPress={() => setImageViewerVisible(true)}
              >
                <Image source={imageSource} style={styles.image} />
              </Pressable>
            ))}

            <ImageView
              images={imageSources}
              imageIndex={0}
              visible={imageViewerVisible}
              onRequestClose={() => setImageViewerVisible(false)}
            />
          </View>
        )}
        <Text
          style={[
            styles.text,
            {
              color: isMe ? "white" : "#52525b",
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
            marginRight: isMe ? 1 : 6,
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
    fontFamily: "Inter-Medium",
    color: "#a1a1aa",
    fontSize: 13,
    marginTop: 4,
    marginLeft: 1,
  },
  messageContainer: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    maxWidth: "80%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,

    elevation: 1.2,
  },
  text: {
    fontFamily: "Inter-Medium",
    fontSize: 15,
    lineHeight: 24,
  },
  images: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageContainer: {
    width: "49.5%",
    aspectRatio: 1,
    padding: 3,
    marginBottom: 6
  },
  image: {
    flex: 1,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
  },
});
export default Message;
