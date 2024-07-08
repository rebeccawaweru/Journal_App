import React, {ReactNode} from "react";
import { View } from "react-native";
import tw from 'twrnc'
import { ImageBackground } from "react-native";
interface WrapperProps {
    children:ReactNode;
}
const Wrapper:React.FC<WrapperProps> = ({ children }) =>{
    return (
        <View style={tw`flex-1`}>
          <ImageBackground source={require('../../assets/book.jpg')} style={tw`flex-1 justify-center px-8`}>
            {children}
         </ImageBackground>
        </View>
   
    )
}
export default Wrapper;