import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ChatScreens from './src/screens/ChatScreens';
import ChatScreen from './src/screens/ChatScreen';
import Navigator from './src/navigation';
import { useFonts } from 'expo-font';




export default function App() {
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
