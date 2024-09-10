import Filter from "../components-side/Filter";
import HotelCard from "../components-side/HotelCard";
import {Link} from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import * as apiQuery from '../API_client' ;
import {hotelFormType} from '../../../backendBooking/src/models/hotel.model'



const Hotels = ()=>{




const {data,isLoading} = useQuery({
  queryKey:['gethotels'],
  queryFn:apiQuery.fetchHotels
  
})



return (
  <>
    <Filter />
    <div className=" flex justify-between min-w-[575px] max-w-3xl  mx-auto pt-12 ">
      <h1 className="font-bold text-4xl "> Hotels</h1>
      <Link to={"/addHotels"}>
        <button className=" p-2 bg-teal-500 hover:bg-teal-600 text-white font-bold  text-center   py-2 rounded-xl shadow-l">
          {" "}
          Create Hotel{" "}
        </button>
      </Link>
    </div>
    {isLoading && <div className="flex justify-center items-center h-60">
      <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
    </div>}
    {data?.map((hotel:hotelFormType) => (
      <HotelCard Hotel={hotel} key={hotel._id} />
    ))}
  </>
);
};

export default Hotels