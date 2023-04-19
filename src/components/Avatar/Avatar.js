import React, {useContext} from "react";
import { StyleSheet, Image, View } from "react-native";
import themeContext from "../../config/themeContext";
import { FontAwesome } from "@expo/vector-icons";


const Avatar = ({user, chatRoom}) => {
  const theme = useContext(themeContext);

  const isGroup = chatRoom?.users?.items?.length > 2

  return (
    user?.image ? (
        <Image
          source={{ uri: user?.image }}
          style={[
            styles.image,
            {
              borderWidth: theme.imgBorderWidth,
              borderColor: theme.imgBorderColor,
              backgroundColor: theme.bgColor,
            },
          ]}
        />
      ) : (
        <View
          style={[
            styles.image,
            {
              borderWidth: theme.imgBorderWidth,
              borderColor: theme.imgBorderColor,
              backgroundColor: theme.bgColor,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          {!isGroup ? (
            <FontAwesome name="user" size={30} color={theme.userIconColor} />
          ) : (
            <FontAwesome name="users" size={30} color={theme.userIconColor} />
          )}
        </View>
      )
  );

};
const styles= StyleSheet.create({
  image: {
  width: 66,
  height: 66,
  borderRadius: 33,
  marginRight: 10,
  // borderWidth: 1,
  // borderColor: "rgba(0, 0, 0, 0.1)",
},
})

export default Avatar;
