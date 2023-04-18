import { useContext } from "react"
import { View, Text, Image, StyleSheet } from "react-native";
import image from "../../assets/images/not-implemented.png"
import themeContext from "../config/themeContext";

const NotImplementedScreen = () => {
  const theme = useContext(themeContext);

  return (
    <View style={[styles.container, {backgroundColor: theme.bgColor}]}>
      <Text style={[styles.text, {color: theme.subtitleColor}]}>Not Implemented!</Text>
      <Image source={image} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Inter-SemiBold",
    fontSize: 22,
    zIndex: 2,
    marginTop: "30%",
    marginBottom: 20
  },
  image: {
    width: "100%",
    height: "50%"
  },
});

export default NotImplementedScreen;