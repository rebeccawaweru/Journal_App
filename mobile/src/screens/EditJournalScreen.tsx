import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import client from '../client/api'
import { NavigationProps } from '../types';
import tw from 'twrnc'
import PickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EditJournal:React.FC<NavigationProps> = ({ route, navigation }) => {
  const { journal } = route.params;
  console.log(journal)
  const [title, setTitle] = useState(journal.title || '');
  const [content, setContent] = useState(journal.content || '');
  const [category, setCategory] = useState(journal.category || '');
  const [date, setDate] = useState(new Date(journal.date ) || new Date());

  const handleEditJournal = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken'); // Retrieve JWT token from storage
      const response = await client.put(`/journals/${journal.id}`, { title, content, category, date }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        alert('Journal Updated!')
        navigation.navigate('Journals');
      }
   
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={tw`flex-1 justify-center px-8 bg-white`}>
    <Text style={tw`text-2xl font-bold mb-8 text-center`}>Edit Journal</Text>
    <TextInput style={tw`border border-gray-300 p-2 mb-4 rounded`} placeholder="Title" value={title} onChangeText={setTitle} />
    <PickerSelect
      style={{
        inputWeb:tw`border border-gray-300 p-2 mb-4 rounded`,
        inputIOS: tw`border border-gray-300 p-2 mb-4 rounded`,
        inputAndroid: tw`border border-gray-300 p-2 mb-4 rounded`,
      }}
      value={category}
      onValueChange={(value) => setCategory(value)}
      items={[
        { label: 'Travel', value: 'travel' },
        { label: 'Food', value: 'food' },
        { label: 'Fun', value: 'fun' },
      ]}
    />
<DatePicker
      style={tw`border border-gray-300 p-2 mb-4 rounded`}
      date={date}
      mode="date"
      confirmText="Confirm"
      cancelText="Cancel"
      onDateChange={(selectedDate) => setDate(selectedDate)}
    />
    <TextInput multiline textAlignVertical='top' numberOfLines={6} style={tw`border border-gray-300 p-2 mb-4 rounded`}  placeholder="Content" value={content} onChangeText={setContent} />
    <Button title="Submit" onPress={handleEditJournal} />
  </View>
  );
};

export default EditJournal;
