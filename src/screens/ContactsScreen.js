import { FlatList, StyleSheet } from 'react-native';
import chats from '../../assets/data/chats.json';
import ContactListItem from '../components/ContactListItem';

const ContactsScreen = () => {
  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => <ContactListItem user={item.user} />}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingTop: 4,
  }
})

export default ContactsScreen;