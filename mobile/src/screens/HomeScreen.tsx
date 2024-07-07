// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { NavigationProps } from '../types';
const HomeScreen:React.FC<NavigationProps> = ({ navigation }) => {
  const handleCreateJournals = () => {
    // Navigate to Create Journals screen or handle logic
    navigation.navigate('Create')
  };

  const handleViewJournals = () => {
    // Navigate to View Journals screen or handle logic
    navigation.navigate('Journals')
  };

  return (
    <View style={tw`flex-1 justify-center px-8 bg-white`}>
      <Text style={tw`text-2xl font-bold mb-8 text-center`}>Welcome to Your Journals</Text>

      <TouchableOpacity
        style={tw`bg-blue-500 rounded p-4 mb-4`}
        onPress={handleCreateJournals}
      >
        <Text style={tw`text-white text-center`}>+ Create Journals</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`bg-green-500 rounded p-4`}
        onPress={handleViewJournals}
      >
        <Text style={tw`text-white text-center`}>View Journals</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
