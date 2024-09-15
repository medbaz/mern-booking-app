import React, { useState } from "react";
import { hotelFormType } from "../../../backendBooking/src/models/hotel";
import { Link } from "react-router-dom";

interface HotelCardProps {
  Hotel: hotelFormType;
}

const HotelCard: React.FC<HotelCardProps> = ({ Hotel }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  return (
    <div
      key={Hotel._id}
      className="relative flex  min-w-[575px] max-w-3xl  mx-auto my-4 p-4 gap-6 bg-white border-gray-200 border-4 rounded-lg overflow-hidden"
    >
      <div className="relative min-w-60 min-h-full  overflow-hidden  border-gray-200 border-2 rounded-lg flex items-center justify-center">
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
      </div>
      {/* Details Section */}
      <div className="flex flex-col flex-1">
        <div className=" flex mb-2 justify-between  items-center">
          <h1 className="mt-8 text-2xl font-bold text-gray-800">
            {Hotel.name}
          </h1>
          <div className="flex absolute font-bold cursor-pointer text-2xl right-3 top-1 ">
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
        <p className="mb-8 text-gray-500 text-xs">
          {Hotel.city}, {Hotel.country}
        </p>
        <p className="text-gray-600 mt-2 line-clamp-3 ">{Hotel.description}</p>

        <div className="flex mt-8 w-full justify-between items-center ">
          <div className="  space-x-4">
            <span className="text-gray-700">
              <span className="font-semibold">{Hotel.adultCount}</span> adults,{" "}
              <span className="font-semibold">{Hotel.childCount}</span> children
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
              {Hotel.type}
            </span>
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
        
        <div className=" flex w-full  justify-end mt-2 gap-2">
          <button className=" bg-red-600  text-white font-bold py-2 px-4 rounded hover:bg-red-500 transition duration-300">
            Delete
          </button>
        <Link to={`/HotelDetails/${Hotel._id}`} state={Hotel._id}>
          <button className=" bg-blue-950  text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
            View Details
          </button>
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default HotelCard;
