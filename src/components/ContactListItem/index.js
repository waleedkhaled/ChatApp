import { useContext } from "react";
import { Text, Image, StyleSheet, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import { getCommonChatRoomWithUser } from "../../services/chatRoomService";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import themeContext from "../../config/themeContext";
import Avatar from "../Avatar/Avatar";

dayjs.extend(relativeTime);

const ContactListItem = ({
  user,
  onPress = () => {},
  selectable = false,
  isSelected = false,
}) => {
  const theme = useContext(themeContext);

  const navigation = useNavigation();

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Avatar user={user} />
      <View style={styles.content}>
        <Text
          style={[styles.name, { color: theme.smallHeaderColor }]}
          numberOfLines={1}
        >
          {user.name}
        </Text>
        <Text
          numberOfLines={2}
          style={[
            styles.subTitle,
            {
              color: theme.subtitleColor,
            },
          ]}
        >
          {user.status}
        </Text>
      </View>

      {selectable &&
        (isSelected ? (
          <AntDesign name="checkcircle" size={24} color={theme.mainColor} />
        ) : (
          <FontAwesome
            name="circle-thin"
            size={28}
            color={theme.subtitleColor}
          />
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
  content: {
    flex: 1,
    marginRight: 4,
  },
  name: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    marginBottom: 2,
  },
  subTitle: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    lineHeight: 18,
  },
});

export default ContactListItem;
