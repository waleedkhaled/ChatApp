import { useEffect, useState, createContext } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ChatsScreen from './src/screens/ChatsScreen/ChatsScreen';
import ChatScreen from './src/screens/ChatScreen';
import Navigator from './src/navigation';
import { useFonts } from 'expo-font';
import { withAuthenticator, AmplifyTheme } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports"
import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify';
import {getUser} from "./src/graphql/queries";
import {createUser} from "./src/graphql/mutations";

import { EventRegister } from "react-native-event-listeners";
import themeContext from "./src/config/themeContext";
import theme from "./src/config/theme";
import modeContext from "./src/config/modeContext";


Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  const [mode, setMode] = useState(false)

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "changeTheme",
      (data) => {
        setMode(data);
      }
    )
    return () => {
      EventRegister.removeEventListener(eventListener)
    }
  }, [])

  useEffect(() => {
    const syncUser = async () => {
      //Authenticated user
      const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true })
      //Search if auth user already exists in DB
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: authUser.attributes.sub })
      )
      if(userData.data.getUser){
        console.log("User already exists in database!")
        return;
      }

      const newUser = {
        id: authUser.attributes.sub,
        name: authUser.attributes.phone_number,
        status: 'Hey, I am using ChatApp'
      }
      const newUserResponse = await API.graphql(
        graphqlOperation(createUser, {input: newUser})
      )
    }

    syncUser();
  }, [])

  //Load the custom font
  const [fontLoaded] = useFonts({
    'Inter-Medium': require('./assets/fonts/Inter-Medium.otf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.otf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.otf'),
  })
  if (!fontLoaded) {
    return undefined;
  }

  return (
    <modeContext.Provider value={mode}>
      <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
        <View style={styles.container}>
          <Navigator />
          <StatusBar style={mode ? "dark" : "light"} />
        </View>
      </themeContext.Provider>
    </modeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'whitesmoke',
  },
});

const authTheme = {
  ...AmplifyTheme,
  container: {
    ...AmplifyTheme.container,
    backgroundColor: "#f4f4f5",
  },
  sectionHeaderText: {
    ...AmplifyTheme.sectionHeaderText,
    color: "#27272a",
    fontSize: 22,
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: "#3633DA",
  },
  sectionFooterLinkDisabled: {
    ...AmplifyTheme.sectionFooterLinkDisabled,
    color: "#5e5ce1",
  },
  input: {
    ...AmplifyTheme.input,
    color: "#52525b",
  },
  inputLabel: {
    ...AmplifyTheme.inputLabel,
    color: "#27272a",
  },
  phoneInput: {
    ...AmplifyTheme.phoneInput,
    color: "#52525b",
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "#3633DA",
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: "#5e5ce1",
  },
  navButton: {
    ...AmplifyTheme.navButton,
    backgroundColor: "#3633DA",
  },
};

export default withAuthenticator(App, {theme: authTheme});