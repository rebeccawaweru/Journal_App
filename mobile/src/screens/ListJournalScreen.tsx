import React, { useState, useEffect } from 'react';
import { View, Text, Button, Touchable, TouchableHighlight } from 'react-native';
import { JournalEntry, NavigationProps } from '../types';
import client from '../client/api'
import tw from 'twrnc'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
const ListJournal:React.FC<NavigationProps> = ({ navigation }) => {
  const [journals, setJournals] = useState([])
  const handleDelete = async(id:any) => {
      try {
        const token =  await AsyncStorage.getItem('jwtToken'); 
        const response = await client.delete(`/journals/${id}`,{
          headers: { Authorization: `Bearer ${token}` }
        })
        if (response.data.success) {
            alert('Journal Deleted!')
        }
      } catch (error) {
          console.error(error)
      }
  }
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const token =  await AsyncStorage.getItem('jwtToken'); 
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
    <ScrollView style={tw`flex-1`}>
    <View style={tw`p-4`}>
      <Text style={tw`text-xl font-bold mb-4`}>Journal List</Text>
      {journals.map((item:JournalEntry) => (
        <View key={item.id} style={tw`mb-4 border rounded p-4`}>
          <Text style={tw`text-lg font-bold mb-2`}>{item.title}</Text>
          <Text style={tw`mb-2`}>Category: {item.category}</Text>
          <Text style={tw`mb-2`}>{item.content}</Text>
          <Text style={tw`mb-2`}>{item.date}</Text>
          <TouchableHighlight style={tw`bg-green-600 p-4 my-2 `} onPress={() => navigation.navigate('Edit', { data:item })}><Text style={tw`text-white font-semibold`}>Edit</Text></TouchableHighlight>
          <TouchableHighlight style={tw`bg-red-500 p-4 my-2`} onPress={()=>handleDelete(item.id)}><Text  style={tw`text-white font-semibold`}>Delete</Text></TouchableHighlight>
   
        </View>
      ))}
      <Button title="Add Journal" onPress={() => navigation.navigate('Create')} />
    </View>
    </ScrollView>
  );
};

export default ListJournal;
