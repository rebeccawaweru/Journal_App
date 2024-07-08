import React, { useState } from 'react';
import {Text,TouchableOpacity} from 'react-native';
import client from '../client/api'
import { NavigationProps } from "../types";
import tw from 'twrnc'
import PickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Wrapper from '../layouts/Wrapper';
import { DatePicker, BasicInput, BasicButton } from '../components';
const CreateJournal:React.FC<NavigationProps> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date:Date) => {
    setDate( date);
    hideDatePicker();
  };
  const handleAddJournal = async () => {

    try {
      const token:any = await AsyncStorage.getItem('jwtToken'); // Retrieve JWT token from storage
       await client.post('/journals', { title, content, category, date }, {
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
    <Wrapper>
      <Text style={tw`text-2xl font-bold mb-8 text-center`}>Add Journal</Text>
      <BasicInput placeholder="Title" value={title} onChangeText={setTitle} />
      <PickerSelect
        style={{
          inputWeb:tw`border border-gray-300 p-2 mb-4 rounded`,
          inputIOS: tw`border border-gray-400 p-2 mb-4 rounded`,
          inputAndroid: tw`border border-gray-400 p-2 mb-4 rounded`,
        }}
        value={category}
        onValueChange={(value) => setCategory(value)}
        items={[
          { label: 'Travel', value: 'travel' },
          { label: 'Food', value: 'food' },
          { label: 'Fun', value: 'fun' },
        ]}
      />
      <TouchableOpacity style={tw`my-2 border border-gray-400 p-2`} onPress={()=>setDatePickerVisibility(true)}><Text>Change Date - {date.toLocaleString()} </Text></TouchableOpacity>
      <DatePicker
        isDatePickerVisible={isDatePickerVisible}
        handleConfirm={handleConfirm}
        hideDatePicker={hideDatePicker}
      />
      <BasicInput multiline textAlignVertical='top' rows={6} placeholder="Content" value={content} onChangeText={setContent} />
      <BasicButton onPress={handleAddJournal} />
      </Wrapper>
  );
};

export default CreateJournal;
