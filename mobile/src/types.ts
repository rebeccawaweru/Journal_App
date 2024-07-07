import {NavigationProp, ParamListBase, RouteProp} from "@react-navigation/native"
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