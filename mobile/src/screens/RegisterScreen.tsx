import React, {useState} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import client from '../client/api'
import { NavigationProps } from "../types";
import tw from 'twrnc';
import { ImageBackground } from 'react-native'
import { BasicButton, BasicInput } from "../components";
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
            <BasicInput placeholder="Username" value={username} onChangeText={setUsername} />
            <BasicInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <BasicButton onPress={handleRegister}/>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={tw`text-blue-500 mt-4 underline text-center`}>Already have an account?</Text>
            </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

export default RegisterScreen;