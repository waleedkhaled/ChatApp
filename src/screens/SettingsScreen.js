import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import { Auth } from "aws-amplify";

const SettingsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Button onPress={() => Auth.signOut()} title="Sign Out" color="#3633DA" />
    </View>
  );
};

export default SettingsScreen;
