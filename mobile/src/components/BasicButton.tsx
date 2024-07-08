import { TouchableOpacity, Text } from "react-native";
import tw from 'twrnc';
export default function BasicButton(props:any){
    return    <TouchableOpacity style={tw`bg-green-600 text-center p-4`} {...props}>
    <Text style={tw`text-white text-center`}>Submit</Text>
</TouchableOpacity>
}