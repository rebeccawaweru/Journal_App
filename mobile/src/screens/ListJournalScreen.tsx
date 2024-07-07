import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { JournalEntry, NavigationProps } from '../types';
import client from '../client/api'
import tw from 'twrnc'
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
    <View style={tw`p-4`}>
      <Text style={tw`text-xl font-bold mb-4`}>Journal List</Text>
      {journals.map((item:JournalEntry) => (
        <View key={item.id} style={tw`mb-4 border rounded p-4`}>
          <Text style={tw`text-lg font-bold mb-2`}>{item.title}</Text>
          <Text style={tw`mb-2`}>{item.content}</Text>
          <Text style={tw`mb-2`}>{item.category}</Text>
          <Text style={tw`mb-2`}>{item.date}</Text>
          <Button title="Edit" onPress={() => navigation.navigate('EditJournal', { item })} />
        </View>
      ))}
      <Button title="Add Journal" onPress={() => navigation.navigate('Create')} />
    </View>
  );
};

export default ListJournal;
