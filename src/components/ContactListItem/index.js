import { Text, Image, StyleSheet, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import { getCommonChatRoomWithUser } from "../../services/chatRoomService";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ContactListItem = ({
  user,
  onPress = () => {},
  selectable = false,
  isSelected = false,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{ uri: user.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>

        <Text numberOfLines={2} style={styles.subTitle}>
          {user.status}
        </Text>
      </View>

      {selectable &&
        (isSelected ? (
          <AntDesign name="checkcircle" size={24} color="#3633DA" />
        ) : (
          <FontAwesome name="circle-thin" size={28} color="#bbb" />
        ))}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 2,
    marginHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, .1)",
  },
  content: {
    flex: 1,
    marginRight: 4
  },
  name: {
    fontFamily: "Inter-SemiBold",
    color: "#18181b",
    fontSize: 15,
    marginBottom: 1,
  },
  subTitle: {
    fontFamily: "Inter-Medium",
    fontSize: 13,
    lineHeight: 17,
    color: "#a1a1aa",
  },
});

export default ContactListItem;
