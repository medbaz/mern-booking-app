import React from 'react';
import { hotelFacilities } from '../../config/hotel-options-config';
import { useFormContext } from 'react-hook-form';
import { HotelsFormTypes } from './ManagingHotelForm';



const HotelFacilities:React.FC = ()=> {
    const {register , formState:{errors}} = useFormContext<HotelsFormTypes>()
    return (
        <div className="max-w-4xl mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Choose Your Hotel Facilities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4">
            {hotelFacilities.map((facility, index) => (
              <label
                key={index}
                className="flex items-center bg-gray-100 text-gray-800 py-3 px-4 rounded-md cursor-pointer hover:bg-gray-200 transition duration-200 shadow-sm border border-gray-300"
              >
                <input
                  type="checkbox"
                  value={facility}
                  className="form-checkbox h-5 w-5 text-blue-500 mr-2 rounded "
                  {...register('facilities',{required:"this field is required"})}
                />
                <span>{facility}</span>
              </label>
            ))}
          </div>
          {errors.facilities && (<p className='text-red-600 font-semibold ' >{errors.facilities.message }</p>)}
        </div>
      );
}

export default HotelFacilities;
