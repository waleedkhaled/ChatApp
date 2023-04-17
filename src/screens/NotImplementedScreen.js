import { View, Text, Image, StyleSheet } from "react-native";
import image from "../../assets/images/not-implemented.png"

const NotImplementedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Not Implemented!</Text>
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
    backgroundColor: "white",
  },
  text: {
    fontFamily: "Inter-SemiBold",
    fontSize: 22,
    color: "#a1a1aa",
    zIndex: 2,
    marginTop: "30%",
    marginBottom: 10
  },
  image: {
    width: "100%",
    height: "50%"
  },
});

export default NotImplementedScreen;