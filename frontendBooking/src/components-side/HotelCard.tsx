import React, { useState } from "react";
import { hotelFormType } from "../../../backendBooking/src/shares/types";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as apiQuery from "../API_client";
import { useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../context/AppContext";

interface HotelCardProps {
  Hotel: hotelFormType;
}

const HotelCard: React.FC<HotelCardProps> = ({ Hotel }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { showToast } = useAppContext();

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === Hotel.imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? Hotel.imageUrls.length - 1 : prevIndex - 1
    );
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: string) => apiQuery.deleteHotelByID(id),
    onSuccess() {
      showToast({ message: "Hotel Deleted Successfully", type: "SUCCESS" });
      queryClient.invalidateQueries({queryKey: ['gethotels']});
    },
    onError() {
      showToast({ message: "Unable To Delete Hotel", type: "ERROR" });
    },
  });

  const handleDelete = (id: string) => {
    console.log(id);

    mutate(id);
  };

  return (
    <div
      key={Hotel._id}
      className="relative flex  min-w-[500px] max-w-[800px] max-h-72 text-sm     p-2 gap-4 bg-white border-gray-200 border-4 rounded-lg overflow-hidden"
    >
      <div className="relative min-w-60 h-60  overflow-hidden  border-gray-200 border-2 rounded-lg flex items-center justify-center">
        <img
          src={Hotel.imageUrls[currentImageIndex]}
          alt={`Hotel Image ${currentImageIndex + 1}`}
          className="object-cover object-center w-60 h-60"
        />
        {/* Carousel Buttons */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white font-bold p-2 rounded-full"
          onClick={handlePrevious}
        >
          &#8249;
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white font-bold p-2 rounded-full"
          onClick={handleNext}
        >
          &#8250;
        </button>
        <div className="absolute bottom-2 p-2 rounded-lg  bg-slate-800  flex gap-1 justify-center items-center ">
          {Hotel.imageUrls.map((imgUrl, index) => (
            <button
              key={imgUrl}
              className={` w-3 h-3   rounded-full ${
                currentImageIndex == index ? " bg-white  " : "bg-gray-500  "
              }`}
              onClick={() => setCurrentImageIndex(index)}
            >
              {" "}
            </button>
          ))}
        </div>
        <div className="absolute font-bold  rounded-md bg-opacity-40 bg-blue-900 cursor-pointer text-2xl right-3 top-3 ">
            {Array.from({ length: 5 - Hotel.starRating }, (_, index) => (
              <span key={index} className="  text-gray-200 p-[2px]">
                ★
              </span>
            ))}
            {Array.from({ length: Hotel.starRating }, (_, index) => (
              <span
                key={5 - Hotel.starRating + index}
                className="  text-yellow-500 p-[2px]"
              >
                ★
              </span>
            ))}
          </div>
      </div>


      {/* Details Section */}
      <div className="grid grid-cols-1 w-full">
        <div className=" flex  justify-between  items-center">
          <h1 className=" text-2xl font-bold text-gray-800">
            {Hotel.name}
          </h1>
          
        </div>
        <p className="mb-4 text-gray-500 text-xs">
          {Hotel.city}, {Hotel.country}
        </p>
        <p className="text-gray-600  line-clamp-3 ">{Hotel.description}</p>

        <div className="grid grid-cols-1  mt-3 w-full justify-between items-center ">
          
            <div className="text-gray-700 mb-1">
              <span className="font-semibold">{Hotel.adultCount}</span> adults
              <span className="font-semibold"> {Hotel.childCount && " ," } {" "}{Hotel.childCount}</span>{Hotel.childCount && " children"}
            </div>
            
        
          <div className="flex flex-1 justify-between">
          <div className="px-2 py-1 w-fit bg-blue-100 text-blue-800 text-sm font-medium rounded">
              {Hotel.type}
            </div>
          <div className="flex gap-1">
            <p className="text-2xl font-bold text-blue-600">
              ${Hotel.pricePerNight}
            </p>
            <p className="text-gray-500 text-sm line-through">
              ${(Hotel.pricePerNight * 1.18).toFixed(0)}
            </p>
          </div>
          </div>
        </div>

        <div className=" flex w-full text-sm  justify-between md:justify-end items-center mt-2 gap-2">
          <button
            onClick={() => handleDelete(Hotel._id)}
            className=" bg-red-600  text-white font-bold py-2 px-4 rounded hover:bg-red-500 transition duration-300"
          >
            Delete
          </button>
          <Link to={`/HotelDetails/${Hotel._id}`} state={Hotel._id}>
            <button 
            className=" bg-blue-950  text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
