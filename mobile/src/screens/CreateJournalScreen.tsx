import React, { useState } from 'react';
import { View, Text, TextInput, Button} from 'react-native';
import client from '../client/api'
import { NavigationProps } from "../types";
import tw from 'twrnc'
import PickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
const CreateJournal:React.FC<NavigationProps> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());

  const handleAddJournal = async () => {

    try {
      const token:any = await AsyncStorage.getItem('jwtToken'); // Retrieve JWT token from storage
      const decode:any = await jwtDecode(token)
      const userId = decode.id
       await client.post('/journals', { title, content, category, date, userId }, {
        headers: { Authorization: `Bearer ${token}` }
      }).then((res)=>{
        if (res.data.success) {
           alert('Journal added')
           navigation.navigate('Journals');
        }
      })
    
 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={tw`flex-1 justify-center px-8 bg-white`}>
      <Text style={tw`text-2xl font-bold mb-8 text-center`}>Add Journal</Text>
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
      <Button title="Submit" onPress={handleAddJournal} />
    </View>
  );
};

export default CreateJournal;
