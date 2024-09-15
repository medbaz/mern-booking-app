import {LoginformTypes} from './components/SignUp';
import {SigninformTypes} from './components/SignIn';
import { hotelFormType } from '../../backendBooking/src/models/hotel';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export type response_TYPE = {
    userId:string
}



// REGISTER REQUEST
export const register = async (formData:LoginformTypes)=>{
    const response = await  fetch(`${VITE_API_BASE_URL}/api/auth/sign_up`, {
        method:'POST',
        credentials:'include',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
    })

    const responseBody = await response.json()

    if (!response.ok) {
       throw new Error(responseBody.message);
    }
   return responseBody ;
}



// SIGN IN REQUEST
export const signIn = async (formData:SigninformTypes)=>{
    const response = await  fetch(`${VITE_API_BASE_URL}/api/auth/login`, {
        method:'POST',
        credentials:'include',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
    })

    const responseBody = await response.json()

    if (!response.ok) {
       throw new Error(responseBody.message);
    }
   return responseBody ;
}



// TOKEN VALIDATION
export const validate_Token = async () => {
    const response =  await fetch(`${VITE_API_BASE_URL}/api/auth/validation`,{
        credentials:'include',
        headers:{
            'Content-Type':'application/json'
        }
    })

    const tokenResponse = await response.json()

    if (!response.ok) {
        console.log(tokenResponse.message);
        
         throw new Error(tokenResponse.message);
    }
    console.log(tokenResponse);
    return tokenResponse ;
    
}



// LOG OUT USER
export const logoutUser = async () => {
    const response = await fetch(`${VITE_API_BASE_URL}/api/auth/logout`,{
        credentials:'include',
        method:'POST'
    })

    if (!response.ok) {
        console.log('logout f frontend not working');
        
     throw new Error("Not logged out yet");
    }
}





// HOTEL LOGIC

// ADD HOTEL
export const addMyHotel = async (hotelFormData:FormData) => {
    const response = await fetch(`${VITE_API_BASE_URL}/api/myHotels`,{
        method:"POST",
        credentials:'include',
        body:hotelFormData ,
    })

    if (!response.ok) {
        throw new Error("Unable to Save Hotel");
        
    }
    return response.json()
}


// EDIT HOTEL BY ID 

export const editHotelById = async (hotelFormData:FormData,id:string ):Promise<hotelFormType> => {
    const response = await fetch(`${VITE_API_BASE_URL}/api/myHotels/${id}`,{
        method:"PUT",
        credentials:'include',
        body:hotelFormData
    })


    if (!response.ok) {
        
        throw new Error("Unable to Edite Hotel");
        
    }
    // Error! Failed to execute 'json' on 'Response': body stream already read

    return response.json()
}

// FETCH HOTELS
export const fetchHotels = async () => {
    const response = await fetch(`${VITE_API_BASE_URL}/api/myHotels`,{
        credentials:'include',
    })

    if (!response.ok) {
        throw new Error("Unable to get Hotels");
        
    }
    return response.json()
}



// GET HOTEL BY ID 

export const fetchHotelById = async (id:string ):Promise<hotelFormType> => {
    const response = await fetch(`${VITE_API_BASE_URL}/api/myHotels/${id}`,{
        credentials:'include',
    })

    if (!response.ok) {
        
        throw new Error("Unable to get Hotels");
        
    }
    
    return response.json()
}




