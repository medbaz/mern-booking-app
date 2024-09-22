import React from 'react';
import { useFormContext } from 'react-hook-form';
import { HotelsFormTypes } from './ManagingHotelForm';

const GuestComponent:React.FC = ()=> {
    const {register , formState:{errors}} = useFormContext<HotelsFormTypes>()

   return (
    <>
    <h2 className="text-2xl font-bold mx-auto my-4 text-gray-800 text-center">Guest Details</h2>
    <div className="max-w-4xl m-6 p-6 bg-gray-300  rounded-md">
    <div className='flex flex-col md:flex-row gap-4'>
    <div className="flex-1">
      <label htmlFor="adults" className="block text-gray-700 font-medium mb-2">
        Adults
      </label>
      <input
        type="number"
        id="adultCount"
        min={1}
        max={6}
        placeholder="Number of adults"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...register('adultCount',{required:"this field is required"})}

      />
        {errors.adultCount && (<p className='text-red-600 font-semibold ' >{errors.adultCount.message }</p>)}

    </div>

    <div className="flex-1">
      <label htmlFor="children" className="block text-gray-700 font-medium mb-2">
        Children
      </label>
      <input
        type="number"
        id="childCount"
        min={0}
        max={6}
        placeholder="Number of children"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...register('childCount')}

      />
    {errors.childCount && (<p className='text-red-600 font-semibold ' >{errors.childCount.message }</p>)}
    </div>
    </div>
    
  </div>
  </>
);
}

export default GuestComponent;
