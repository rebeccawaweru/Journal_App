import React, {useState} from "react";
import { View, Text, TextInput, Button } from "react-native";
import client from '../client/api'
import { NavigationProps } from "../types";

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
        <View>
            <Text>Register</Text>
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Register" onPress={handleRegister}/>
            <Button title="Login" onPress={()=>navigation.navigate('Login')}/>
        </View>
    )
}

export default RegisterScreen;