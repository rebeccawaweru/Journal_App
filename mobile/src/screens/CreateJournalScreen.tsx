import React, { useContext, useState } from 'react';
import {Text,TouchableOpacity} from 'react-native';
import client from '../client/api'
import { NavigationProps } from "../types";
import tw from 'twrnc'
import PickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Wrapper from '../layouts/Wrapper';
import { DatePicker, BasicInput, BasicButton } from '../components';
import { JournalContext } from '../context/Journal';
const CreateJournal:React.FC<NavigationProps> = ({ navigation }) => {
  const {journal, dispatch} = useContext(JournalContext)!;
  const handleConfirm = (date:Date) => {
    dispatch({type:"HANDLE_CONFIRM", payload:date})
  };
  const handleAddJournal = async () => {
    try {
      const token:any = await AsyncStorage.getItem('jwtToken'); // Retrieve JWT token from storage
       await client.post('/journals', journal, {
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
      <BasicInput
        placeholder="Title"
        value={journal.title}
        onChangeText={text => dispatch({ type: "HANDLE_CHANGE", payload: { field: 'title', value:text } })}
      />
      <PickerSelect
        style={{
          inputWeb:tw`border border-gray-300 p-2 mb-4 rounded`,
          inputIOS: tw`border border-gray-400 p-2 mb-4 rounded`,
          inputAndroid: tw`border border-gray-400 p-2 mb-4 rounded`,
        }}
        value={journal.category}
        onValueChange={(value) => dispatch({type:"HANDLE_CHANGE", payload:{field:"category", value:value}})}
        items={[
          { label: 'Travel', value: 'travel' },
          { label: 'Food', value: 'food' },
          { label: 'Fun', value: 'fun' },
        ]}
      />
      <TouchableOpacity style={tw`my-2 border border-gray-400 p-2`} onPress={()=>dispatch({type:'SHOW'})}><Text>Change Date - {journal.date.toLocaleString()} </Text></TouchableOpacity>
      <DatePicker
        isDatePickerVisible={journal.isDatePickerVisible}
        handleConfirm={handleConfirm}
        hideDatePicker={()=>dispatch({type:'HIDE'})}
      />
      <BasicInput multiline textAlignVertical='top'  placeholder="Content" value={journal.content} onChangeText={text =>dispatch({type:"HANDLE_CHANGE",payload:{field:'content', value:text}})} />
      <BasicButton onPress={handleAddJournal} />
      </Wrapper>
  );
};

export default CreateJournal;
