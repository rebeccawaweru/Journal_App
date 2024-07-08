import React, {useState} from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import client from '../client/api'
import { NavigationProps } from "../types";
import tw from 'twrnc';
import { ImageBackground } from 'react-native'

const RegisterScreen:React.FC<NavigationProps> = ({ navigation }) => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const handleRegister = async () => {
        try {
            const response = await client.post('/auth/register', {username,password})
            if (response.data.success) {
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <View style={tw`flex-1`}>
            <ImageBackground source={require('../../assets/book.jpg')} style={tw`flex-1 justify-center px-8 overflow-hidden`}>
            <Text style={tw`text-2xl font-bold mb-8 text-center`}>Register</Text>
            <TextInput style={tw`border border-gray-400 p-2 mb-4 rounded`} placeholder="Username" value={username} onChangeText={setUsername} />
            <TextInput style={tw`border border-gray-400 p-2 mb-4 rounded`} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <TouchableOpacity style={tw`bg-green-600 text-center p-4`} onPress={handleRegister}>
                <Text style={tw`text-white text-center`}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={tw`text-blue-500 mt-4 underline text-center`}>Already have an account?</Text>
            </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

export default RegisterScreen;