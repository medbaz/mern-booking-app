import { useQuery } from "@tanstack/react-query";
// import Filter from "../components-side/Filter";
import { useSearchContext } from "../context/SearchContext";
import * as apiQlient from "../API_client";
import { useState } from "react";
import HotelCard from "../components-side/HotelCard";
import { hotelFormType } from "../../../backendBooking/src/shares/types";
import { hotelTypes ,hotelFacilities } from '../config/hotel-options-config';
const Hotels = () => {
  const SearchContext = useSearchContext();
  
  const [page, setPage] = useState(1);
  if (page == 3) {
    
    setPage(2)
  }

  const searchParams = {
    destination: SearchContext.destination,
    checkIn: SearchContext.checkIn.toISOString(),
    checkOut: SearchContext.checkOut.toISOString(),
    adultCount: SearchContext.adultCount.toString(),
    childCount: SearchContext.childCount.toString(),
    page: page.toString(),
  };

  const { data: hotelParams, isLoading } = useQuery({
    queryKey: ["searchQuery", searchParams],
    queryFn: () => apiQlient.searchHotels(searchParams),
    retry: false,
  });
  console.log(hotelParams?.data);

  return (
    <div className="px-6 mt-8">
    
      {isLoading && (
        <div className="flex justify-center items-center h-60">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
        </div>
      )}
      <div className=" relative m-auto  max-w-7xl  grid gap-4  grid-cols-[170px_1fr] ">
        <div className=" sticky top-20 text-sm p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Filter by:</h2>

          {/* Property Rating */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">
              Property Rating
            </h3>
            <div className="flex flex-col space-y-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> {index + 1}{" "}
                  {index + 1 == 1 ? "Star" : "Stars"}
                </label>
              ))}
            </div>
          </div>

          {/* Hotel Type */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">Hotel Type</h3>
            <div className="flex flex-col space-y-1">
              {hotelTypes.map((type) => (
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> 
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">Facilities</h3>
            <div className="flex flex-col space-y-2">
            {hotelFacilities.map((type) => (
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> 
                  {type}
                </label>
              ))}
           
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2  grid-rows-3 gap-2">
          {hotelParams?.data.map((hotel: hotelFormType) => (
            <HotelCard Hotel={hotel} key={hotel._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hotels;
