import {LoginformTypes} from './components/SignUp';
import {SigninformTypes} from './components/SignIn';

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
