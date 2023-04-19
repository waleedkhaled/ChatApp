import { View, Text, Button, Switch, StyleSheet, Pressable } from "react-native";
import { useState, useContext } from "react";
import { Auth } from "aws-amplify";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../config/themeContext";

const SettingsScreen = () => {
  const theme = useContext(themeContext);
  const [mode, setMode] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.darkerBgColor }]}>
      <View style={[styles.row, {backgroundColor:theme.bgColor, 
        borderWidth: theme.imgBorderWidth,
        borderColor: theme.imgBorderColor
      }]}>
        <Text style={[styles.label, { color: theme.textColor }]}>
          Dark Mode
        </Text>
        <Switch
          value={mode}
          onValueChange={(value) => {
            setMode(value);
            EventRegister.emit("changeTheme", value);
          }}
          thumbColor={mode ? theme.mainColor : theme.textColor}
          trackColor={{ false: theme.subtitleColor, true: theme.smallHeaderColor }}
          style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
        />
      </View>
      <Pressable
        style={[styles.button, { backgroundColor: theme.mainColor }]}
        onPress={() => Auth.signOut()}
      >
        <Text style={styles.btnText}>SIGN OUT</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    // paddingVertical: 100,
    // alignItems: "center"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
    // flex: 1
  },
  label: {
    flex: 1,
    fontFamily: "Inter-Medium",
    fontSize: 19,
    // paddingRight: 200
  },
  button: {
    width: "25%",
    height: "6%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  btnText: { 
    color: "#f2f2f2",
    fontFamily: "Inter-Medium", 
    fontSize: 16, 
  }
})
export default SettingsScreen;
