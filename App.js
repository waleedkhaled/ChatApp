import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ChatScreens from './src/screens/ChatScreens';
import ChatScreen from './src/screens/ChatScreen';
import Navigator from './src/navigation';
import { useFonts } from 'expo-font';
import { withAuthenticator } from 'aws-amplify-react-native';
import awsconfig from "./src/aws-exports"
import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify';
import {getUser} from "./src/graphql/queries"
import {createUser} from "./src/graphql/mutations"


Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  useEffect(() => {
    const syncUser = async () => {
      //Authenticated user
      const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true })
      //sub as user ID
      const userID = authUser.attributes.sub;
      //Search if auth user already exists in DB
      const userData = await API.graphql(graphqlOperation(getUser, { id: userID }))
      if(userData.data.getUser){
        console.log("User already exists in database!")
      }

      const newUser = {
        id: userID,
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
    'Antarctica': require('./assets/fonts/AntarcticaBetaVAR-Regular.ttf')
  })
  if (!fontLoaded) {
    return undefined;
  }



  return (
    <View style={styles.container}>
      <Navigator />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'whitesmoke',
  },
});

export default withAuthenticator(App);