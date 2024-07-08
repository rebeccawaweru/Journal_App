import React, {useState} from "react";
import { View, Text, TouchableOpacity} from 'react-native';
import client from '../client/api'
import tw from 'twrnc'
import { NavigationProps } from "../types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from 'react-native'
import { BasicButton, BasicInput } from "../components";
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
        <View style={tw`flex-1`}>
          <ImageBackground source={require('../../assets/book.jpg')} style={tw`flex-1 justify-center px-8 overflow-hidden`}>
            <Text style={tw`text-2xl font-bold mb-8 text-center`}>Login</Text>
            <BasicInput placeholder="Username" value={username} onChangeText={setUsername} />
            <BasicInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <BasicButton onPress={handleLogin}/>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={tw`text-blue-500 mt-4 underline text-center`}>Don't have an account?</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        
    )
}

export default LoginScreen;