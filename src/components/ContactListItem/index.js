import { Text, Image, StyleSheet, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const ContactListItem = ({ user }) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => { }} style={styles.container}>
      <Image source={{ uri: user.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>

        <Text numberOfLines={2} style={styles.subTitle}>
          {user.status}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 6,
    height: 70,
    alignItems: 'center',
  },
  image: {
    width: 66,
    height: 66,
    borderRadius: 33,
    marginRight: 10,
  },
  name: {
    fontFamily: "Antarctica",
    color: "#242C34",
    fontSize: 16,
    fontWeight: '800',
  },
  subTitle: {
    fontFamily: "Antarctica",
    fontSize: 14,
    color: '#999',
  },
});

export default ContactListItem;