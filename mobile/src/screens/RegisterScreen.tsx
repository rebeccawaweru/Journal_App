import React, {useState} from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import client from '../client/api'
import { NavigationProps } from "../types";
import tw from 'twrnc'
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
        <View style={tw`flex-1 justify-center px-8 bg-white`}>
            <Text style={tw`text-2xl font-bold mb-8 text-center`}>Register</Text>
            <TextInput style={tw`border border-gray-300 p-2 mb-4 rounded`} placeholder="Username" value={username} onChangeText={setUsername} />
            <TextInput style={tw`border border-gray-300 p-2 mb-4 rounded`} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Submit" onPress={handleRegister}/>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={tw`text-blue-500 mt-4 underline text-center`}>Already have an account?</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RegisterScreen;