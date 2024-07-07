import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import client from '../client/api'
import { NavigationProps } from '../types';
const EditJournal:React.FC<NavigationProps> = ({ route, navigation }) => {
  const { journal } = route.params;
  const [title, setTitle] = useState(journal.title);
  const [content, setContent] = useState(journal.content);
  const [category, setCategory] = useState(journal.category);
  const [date, setDate] = useState(journal.date);

  const handleEditJournal = async () => {
    try {
      const token = 'jwt-token'; // Retrieve JWT token from storage
      const response = await client.put(`/journals/${journal.id}`, { title, content, category, date }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigation.navigate('JournalList');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Edit Journal</Text>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Content" value={content} onChangeText={setContent} />
      <TextInput placeholder="Category" value={category} onChangeText={setCategory} />
      <TextInput placeholder="Date" value={date} onChangeText={setDate} />
      <Button title="Edit" onPress={handleEditJournal} />
    </View>
  );
};

export default EditJournal;
