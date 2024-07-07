import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { JournalEntry, NavigationProps } from '../types';
import client from '../client/api'
const ListJournal:React.FC<NavigationProps> = ({ navigation }) => {
  const [journals, setJournals] = useState([])
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const token = 'jwt-token'; // Retrieve JWT token from storage
        const response = await client.get('/journals', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJournals(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJournals();
  }, []);

  return (
    <View>
      <Text>Journal List</Text>
      {journals.map((item:JournalEntry) => (
        <View key={item.id}>
          <Text>{item.title}</Text>
          <Text>{item.content}</Text>
          <Text>{item.category}</Text>
          <Text>{item.date}</Text>
          <Button title="Edit" onPress={() => navigation.navigate('EditJournal', { item })} />
        </View>
      ))}
      <Button title="Add Journal" onPress={() => navigation.navigate('AddJournal')} />
    </View>
  );
};

export default ListJournal;
