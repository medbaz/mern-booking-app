import React  from 'react'
import { useFormContext } from 'react-hook-form';
import { HotelsFormTypes } from './ManagingHotelForm';
import { hotelTypes } from '../../config/hotel-options-config';
 

const  TypesSection:React.FC = ()=> {
    
      const {register ,watch,formState:{errors}} = useFormContext<HotelsFormTypes> ()
      const watchType = watch('type')
  return (
    <div className=" p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Choose Your Hotel Type</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3
       lg:grid-cols-5 gap-4">
        {hotelTypes.map((type, index) => (
          <label
            
            key={index}
            className={`flex items-center justify-center ${watchType == type ?' bg-blue-400 ': ' bg-gray-400 '}  text-white py-3 px-4 rounded-md cursor-pointer hover:bg-blue-400 transition duration-200`}
          >
            <input
              type="radio"
              value={type}
              className="hidden"
              {...register("type",{required:"this field is required"  })}
            />
            {type}
          </label>
        ))}
      </div>
      {errors.type && (<p className='text-red-600 font-semibold ' >{errors.type.message }</p>)}
    </div>
  );
}


export default TypesSection