import { TextInput, TextInputProps } from "react-native";
import tw from 'twrnc';

const BasicInput:React.FC<TextInputProps> = (props:any) => {
    return <TextInput style={tw`border border-gray-400 p-2 mb-4 rounded`} {...props} />
}

export default BasicInput;
