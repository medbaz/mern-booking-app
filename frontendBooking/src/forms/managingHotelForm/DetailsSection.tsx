import React from 'react'
import { useFormContext} from 'react-hook-form'
import { HotelsFormTypes } from './ManagingHotelForm'


const  DetailsSection:React.FC = ()=>{
  const {register  , formState:{errors}} = useFormContext<HotelsFormTypes>()

  return (
    <div className="p-6 bg-whiterounded-md">
    <h2 className="text-2xl font-bold mb-6 text-gray-800 ">Hotel Details</h2>

      {/* Hotel Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium ">
          Hotel Name
        <input
          type="text"
          id="name"
          placeholder="Enter hotel name"
          className="w-full p-3 border mt-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("name",{required:"name is required"  })}
        /> </label>
        {errors.name && (<p className='text-red-600 font-semibold ' >{errors.name.message }</p>)}
      </div>


      <div className='flex flex-col mb-4  md:flex-row gap-4'>
        {/* City */}
        <div className=" flex-1 ">
          <label className="block text-gray-700 font-medium mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            placeholder="city"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("city",{required:"city is required"  })}
          />
          {errors.city && (<p className='text-red-600 font-semibold ' >{errors.city.message }</p>)}
        </div>

        {/* Country */}
        <div className="flex-1">
          <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
            Country
          </label>
          <input
            type="text"
            id="country"
            placeholder="Enter country"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("country",{required:"country is required"  })}
          />
          {errors.country && (<p className='text-red-600 font-semibold ' >{errors.country.message }</p>)}
        </div>
      </div>


      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          rows={5} 
          placeholder="Enter a brief description"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("description",{required:"description is required"  })}
        ></textarea>
          {errors.description && (<p className='text-red-600 font-semibold ' >{errors.description.message }</p>)}
      </div>


      {/* Price Per Night */}
      <div className="mb-4">
        <label htmlFor="pricePerNight" className="block text-gray-700 font-medium mb-2">
          Price Per Night
        </label>
        <input
          type="number"
          id="pricePerNight"
          min={1}
          placeholder="Enter price per night"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("pricePerNight",{required:"pricePerNight is required"  })}
        />
        {errors.pricePerNight && (<p className='text-red-600 font-semibold ' >{errors.pricePerNight.message }</p>)}
      </div>


      {/* Star Rating */}
      <div className="mb-4">
        <label htmlFor="starRating" className="block text-gray-700 font-medium mb-2">
          Star Rating
        </label>
        <select
          id="starRating"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("starRating",{required:"starRating is required"  })}
          >
          <option value=""  defaultChecked >Select rating</option>
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
        {errors.starRating && (<p className='text-red-600 font-semibold ' >{errors.starRating.message }</p>)}
      </div>

      

  </div>
  )
}

export default DetailsSection