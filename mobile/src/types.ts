import {NavigationProp, ParamListBase, RouteProp} from "@react-navigation/native"
import { ReactNode, Dispatch } from "react";
export interface JournalEntry {
    id: string;
    title: string;
    content: string;
    category: string;
    date: string;
    userId: string;
  }

//define stack parameters
export type RootStackParamList = {
    EditJournal :{
        journal: JournalEntry
    }
}
export interface NavigationProps {
    navigation:NavigationProp<ParamListBase>
    route:RouteProp<RootStackParamList, 'EditJournal'>
}

export interface ContextProps {
    children: ReactNode,
    data:object
}
export interface JournalState {
    isDatePickerVisible:boolean;
    date:Date;
    title:string,
    category:string,
    content:string
}
export interface JournalContextProps {
    journal: JournalState;
    dispatch: Dispatch<any>;
}
export const initialValues:JournalState = {
    isDatePickerVisible:false,
    date:new Date(),
    title:'',
    category:'',
    content:''
}