import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import client from '../client/api'
import { NavigationProps } from "../types";
const CreateJournal:React.FC<NavigationProps> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleAddJournal = async () => {
    try {
      const token = 'jwt-token'; // Retrieve JWT token from storage
      const response = await client.post('/journals', { title, content, category, date }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigation.navigate('JournalList');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Add Journal</Text>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Content" value={content} onChangeText={setContent} />
      <TextInput placeholder="Category" value={category} onChangeText={setCategory} />
      <TextInput placeholder="Date" value={date} onChangeText={setDate} />
      <Button title="Add" onPress={handleAddJournal} />
    </View>
  );
};

export default CreateJournal;
