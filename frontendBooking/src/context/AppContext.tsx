import React , {useState,createContext, useContext } from "react";
import Toast from "../components/Toast";
import { useQuery } from "@tanstack/react-query";
import * as apiQuery from '../API_client' ;


type ToastMessage = {
    message : string ;
    type:"SUCCESS" | "ERROR";
}

type AppContext = {
    showToast : (toastMessage:ToastMessage)=> void ,
    isLoggedIn : boolean
}

type childrenType = {
    children : React.ReactNode
}

const AppContext = createContext<AppContext | undefined >(undefined)
export const AppContextProvider = ({children}:childrenType)=>{
    const [toast,setToast] = useState<ToastMessage | undefined>(undefined)

    
    // GRANT ACCESS BY TOKEN
    const {isError} = useQuery({
        queryKey:['tokenValidation'],
        queryFn: apiQuery.validate_Token,
        retry:false,
    })

  
        return (
            <AppContext.Provider value={{showToast:(toastMessage:ToastMessage)=>setToast(toastMessage),isLoggedIn:!isError
              }}>
                {toast && <Toast message={toast.message} type={toast.type} onClose={()=>{setToast(undefined)}} />} 
                {children}
            </AppContext.Provider>
        )
    
}

export const useAppContext = ()=>{

    const context = useContext(AppContext)
    return context as AppContext ;
}

