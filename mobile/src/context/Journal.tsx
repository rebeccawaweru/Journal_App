import { createContext, useReducer } from "react";
import { ContextProps,JournalContextProps,JournalState,initialValues } from "../types";
export const JournalContext = createContext<JournalContextProps | undefined>(undefined);
const JournalProvider:React.FC<ContextProps> = ({ children }) => {
    const reducer = (state:JournalState, action:any)=> {
        switch(action.type){
            case 'SHOW':
                return {
                    ...state, isDatePickerVisible:true
                }
            case 'HANDLE_CONFIRM':
                return {
                   ...state, date:action.payload, isDatePickerVisible:false
                   
                }
            case 'HIDE':
                return {
                    ...state, isDatePickerVisible:false
                }
            case 'HANDLE_CHANGE':
                return {
                   ...state, [action.payload.field]:action.payload.value
                }
            default:{
                return state
            }
        }
    }
    const [journal, dispatch] = useReducer(reducer,initialValues)
    return (
       <JournalContext.Provider value={{ journal, dispatch}}>
        {children}
       </JournalContext.Provider>
    )
}

export default JournalProvider