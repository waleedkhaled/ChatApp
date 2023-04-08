import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ChatScreens from './src/screens/ChatScreens';
import ChatScreen from './src/screens/ChatScreen';
import Navigator from './src/navigation';
import { useFonts } from 'expo-font'; 
import { Amplify } from 'aws-amplify';
import awsconfig from "./src/aws-exports"
import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
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