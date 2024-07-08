import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { LoginScreen, RegisterScreen, HomeScreen, CreateJournal, EditJournal, ListJournal } from '../screens';
const Stack = createStackNavigator();
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name='Login'  component={LoginScreen}   options={{ title: 'Journal App' }} />
                <Stack.Screen name='Register' component={RegisterScreen}   options={{ title: 'Get Started' }} />
                <Stack.Screen name='Home' component={HomeScreen}/>
                <Stack.Screen name='Create' component={CreateJournal}/>
                <Stack.Screen name='Edit' component={EditJournal}/>
                <Stack.Screen name='Journals' component={ListJournal}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation