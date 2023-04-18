import { View, Text, Button, Switch } from "react-native";
import { useState, useContext } from "react";
import { Auth } from "aws-amplify";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../config/themeContext";

const SettingsScreen = () => {
  const theme = useContext(themeContext);
  const [mode, setMode] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.darkerBgColor,
      }}
    >
      <Button
        onPress={() => Auth.signOut()}
        title="Sign Out"
        color={theme.mainColor}
      />
      <Switch
        value={mode}
        onValueChange={(value) => {
          setMode(value);
          EventRegister.emit("changeTheme", value);
        }}
        thumbColor={mode ? theme.mainColor : theme.textColor}
        trackColor={{ false: theme.suntitleColor, true: theme.headerColor }}
      />
    </View>
  );
};

export default SettingsScreen;
