import React, { useState } from "react";
// import { hotelFormType } from "../../../backendBooking/src/models/hotel";
import { useQuery } from "@tanstack/react-query";
import * as apiQuery from "../API_client";
import { Link, useParams } from "react-router-dom";



const HotelDetails: React.FC= () => {

const {id} = useParams()

const { data , error } = useQuery({
  queryKey: ["getTheHotel"],
  queryFn: ()=> apiQuery.fetchHotelById(id ||''),
  enabled: !!id
});



  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setMainImageIndex(index);
  };


  return (
    <>
      {!data ? (
        <div className="container mx-auto p-6">ERROR : {error?.message}</div>
      ) : (
        <div className="relative container mx-auto p-6">
          {/* Header Section */}

          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{data.name}</h1>

              <div className="  items-center text-center">
              <span className="text-2xl font-bold">Adress : </span>
              <span className="text-gray-500">
                 {data.city}, {data.country} - Excellent location
              </span>
              </div>

              <div className="flex items-center mt-2">
                <div className="flex">
                  {Array.from({ length: data.starRating }, (_, index) => (
                    <span key={index} className="text-yellow-500">
                      ★
                    </span>
                  ))}
                  {Array.from({ length: 5 - data.starRating }, (_, index) => (
                    <span key={index} className="text-gray-300">
                      ★
                    </span>
                  ))}
                </div>
                <span className="ml-4 text-blue-600 font-medium">
                  Airport shuttle
                </span>
              </div>
            </div>
            <div className="flex gap-2 text-right flex-1 mb-2">
              <div className="text-3xl font-bold text-blue-600">
                ${data.pricePerNight}/night
              </div>
              <p className="text-gray-400 text-sm line-through">
                ${(data.pricePerNight * 1.2).toFixed(0)}
              </p>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="bg-slate-200 p-2 rounded-md">
            <div className=" grid grid-cols-6 gap-2 mb-4">
              <div className="col-span-3">
                <img
                  src={data.imageUrls[mainImageIndex]}
                  alt={`Hotel ${mainImageIndex + 1}`}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div className=" rounded-md col-span-3 grid grid-cols-3 gap-2">
                {data.imageUrls.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-full h-44 bg-white  object-cover rounded-lg cursor-pointer ${
                      mainImageIndex === index ? "border-2 border-blue-600" : ""
                    }`}
                    onClick={() => handleImageClick(index)}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Description Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Hotel Description</h2>
            <p className="text-gray-600 mt-4">{data.description}</p>

            <h3 className="text-xl font-semibold mt-8">Facilities</h3>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              {data.facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </div>

          {/* Guest Information */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Guest Information</h3>
            <p className="mt-4 text-gray-600">
              Adults: {data.adultCount}, Children: {data.childCount}
            </p>
          </div>
          <div className="absolute bottom-8 right-2 ">
            <Link to={`/editHotel/${data._id}`}>
              <button className=" bg-green-800  text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-300">
                Edit Hotel
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default HotelDetails;
