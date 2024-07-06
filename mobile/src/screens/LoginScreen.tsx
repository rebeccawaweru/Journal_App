import React, {useState} from "react";
import { View, Text, TextInput, Button} from 'react-native';
import client from '../client/api'
import { NavigationProp,ParamListBase } from "@react-navigation/native";
type LoginScreenProps = {
    navigation:NavigationProp<ParamListBase>
}
const LoginScreen:React.FC<LoginScreenProps> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
       try {
        const response = await client.post('/auth/login',{username,password});
        if (response.data.token) {
           navigation.navigate('Home')
        }
       } catch (error) {
           console.log(error)
       }
    };
    return (
        <View>
            <Text>Login</Text>
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Login" onPress={handleLogin}/>
            <Button title="Register" onPress={()=>navigation.navigate('Register')}/>
        </View>
    )
}

export default LoginScreen;