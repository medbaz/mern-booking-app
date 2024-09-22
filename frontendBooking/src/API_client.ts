import { LoginformTypes } from "./components/SignUp";
import { SigninformTypes } from "./components/SignIn";
import { hotelFormType } from "../../backendBooking/src/shares/types";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export type response_TYPE = {
  userId: string;
};

// REGISTER REQUEST
export const register = async (formData: LoginformTypes) => {
  const response = await fetch(`${VITE_API_BASE_URL}/api/auth/sign_up`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

// SIGN IN REQUEST
export const signIn = async (formData: SigninformTypes) => {
  const response = await fetch(`${VITE_API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

// TOKEN VALIDATION
export const validate_Token = async () => {
  const response = await fetch(`${VITE_API_BASE_URL}/api/auth/validation`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const tokenResponse = await response.json();

  if (!response.ok) {
    console.log(tokenResponse.message);

    throw new Error(tokenResponse.message);
  }
  console.log(tokenResponse);
  return tokenResponse;
};

// LOG OUT USER
export const logoutUser = async () => {
  const response = await fetch(`${VITE_API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    console.log("logout f frontend not working");

    throw new Error("Not logged out yet");
  }
};

// HOTEL LOGIC

// ADD HOTEL
export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${VITE_API_BASE_URL}/api/myHotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Unable to Save Hotel");
  }
  return response.json();
};

// EDIT HOTEL BY ID

export const editHotelById = async (
  hotelFormData: FormData,
  id: string
): Promise<hotelFormType> => {
  const response = await fetch(`${VITE_API_BASE_URL}/api/myHotels/${id}`, {
    method: "PUT",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Unable to Edite Hotel");
  }
  // Error! Failed to execute 'json' on 'Response': body stream already read

  return response.json();
};

// FETCH HOTELS
export const fetchHotels = async () => {
  const response = await fetch(`${VITE_API_BASE_URL}/api/myHotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to get Hotels");
  }
  return response.json();
};

// GET HOTEL BY ID

export const fetchHotelById = async (id: string): Promise<hotelFormType> => {
  const response = await fetch(`${VITE_API_BASE_URL}/api/myHotels/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to get Hotels");
  }

  return response.json();
};

// DELETE HOTEL BY ID

export const deleteHotelByID = async (id: string) => {
  const response = await fetch(`${VITE_API_BASE_URL}/api/myHotels/${id}`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable To Delete Hotel");
  }

  return response.json();
};




// SEARCH HOTELS
type SearchParams = {
  destination? : string,
  checkIn?:string,
  checkOut?:string,
  adultCount?:string,
  childCount?:string,
  page?:string
}
export const searchHotels = async (searchParams:SearchParams) => {
  const hotelParam = new URLSearchParams()
  hotelParam.append('destination',searchParams.destination || '')
  hotelParam.append('checkIn',searchParams.checkIn || '')
  hotelParam.append('checkOut',searchParams.checkOut || '')
  hotelParam.append('adultCount',searchParams.adultCount || '')
  hotelParam.append('childCount',searchParams.childCount || '')
  hotelParam.append('page',searchParams.page || '')

  const response = await fetch(`${VITE_API_BASE_URL}/api/hotels/search?${hotelParam}`,{
    credentials:"include"
  })

  if (!response.ok) {
    throw new Error("Failed Search request");
  }

  const jsonResponse = response.json()
console.log(jsonResponse);

  return jsonResponse
}
