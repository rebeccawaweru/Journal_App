import { TextInput } from "react-native-gesture-handler";
import tw from 'twrnc';

const BasicInput = (props:any) => {
    return <TextInput style={tw`border border-gray-400 p-2 mb-4 rounded`} {...props} />
}

export default BasicInput;
