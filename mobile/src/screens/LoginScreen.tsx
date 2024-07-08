import React, {useState} from "react";
import { View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import client from '../client/api'
import tw from 'twrnc'
import { NavigationProps } from "../types";
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen:React.FC<NavigationProps> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
       try {
        const response = await client.post('/auth/login',{
            username,
            password
        });
        if (response.data.token) {
            await AsyncStorage.setItem('jwtToken', response.data.token)
           navigation.navigate('Home')
        }
       } catch (error:any) {
           console.log(error)
       }
    };
    return (
        <View style={tw`flex-1 justify-center px-8 bg-white`}>
            <Text style={tw`text-2xl font-bold mb-8 text-center`}>Login</Text>
            <TextInput style={tw`border border-gray-300 p-2 mb-4 rounded`} placeholder="Username" value={username} onChangeText={setUsername} />
            <TextInput style={tw`border border-gray-300 p-2 mb-4 rounded`} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Login" onPress={handleLogin}/>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={tw`text-blue-500 mt-4 underline text-center`}>Don't have an account?</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen;