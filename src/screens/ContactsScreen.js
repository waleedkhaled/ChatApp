import {useState, useEffect} from "react";
import { FlatList, StyleSheet } from 'react-native';
import ContactListItem from '../components/ContactListItem';
import {API, graphqlOperation} from 'aws-amplify';
import {listUsers} from "../graphql/queries"

const ContactsScreen = () => {
  const [users,setUsers] = useState([])

  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then((result) => {
      setUsers(result.data?.listUsers?.items)
    })
  }, [])

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <ContactListItem user={item} />}
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