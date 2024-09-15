import {useForm , FormProvider} from "react-hook-form"
import DetailsSection from "./DetailsSection.tsx"
import TypesSection from "./TypesSection.tsx";
import HotelFacilities from './FacilitiesSection.tsx'
import GuestComponent from "./GuestsSection.tsx";
import ImageSection from "./ImagesSection.tsx";
import { hotelFormType } from "../../../../backendBooking/src/models/hotel.ts";
import { useEffect } from "react";


export type HotelsFormTypes = {
  name:string;
  city:string;
  country:string;
  description:string;
  type:string;
  pricePerNight:number;
  starRating:number;
  facilities:string[];
  imageFiles:FileList;
  imageUrls:string[];
  adultCount:number;
  childCount:number;
}

export type HotelProps =  { onSave?: (hotelFormData: FormData) => void; isPending?: boolean; hotel?:hotelFormType}

function ManagingHotelForm({onSave,isPending,hotel}:HotelProps) {

  const formMethods = useForm<HotelsFormTypes>()
  const {handleSubmit , reset } = formMethods
  const onSubmit = handleSubmit((formDataJson) => {

    const formData = new FormData()
    formData.append('name',formDataJson.name)
    formData.append('city',formDataJson.city)
    formData.append('country',formDataJson.country)
    formData.append('description',formDataJson.description)
    formData.append('type',formDataJson.type)
    formData.append('starRating',formDataJson.starRating.toString())
    formData.append('childCount',formDataJson.childCount.toString())
    formData.append('adultCount',formDataJson.adultCount.toString())
    formData.append('pricePerNight',formDataJson.pricePerNight.toString())
    formDataJson.facilities.forEach((facility,index)=>{
    formData.append(`facilities[${index}]`,facility)})
    Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
      formData.append(`imageFiles`,imageFile)
    })
    formDataJson.imageUrls.forEach((image,index)=>{
      formData.append(`imageUrls[${index}]`,image)})


    if (onSave) {
      onSave(formData)
    }

    
    });

    
    useEffect(() => {
      reset(hotel);
    }, [reset, hotel]);


  return (
    <FormProvider {...formMethods} >

      <form action="" className="max-w-4xl mx-auto" onSubmit={onSubmit}>
        <DetailsSection/>
        <TypesSection/>
        <HotelFacilities/>
        <GuestComponent/>
        <ImageSection/>
        {/* Submit Button */}
      <div className="mt-6  p-6">
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition duration-200 disabled:bg-gray-500">
          {isPending?"Saving ...":"Save"}
        </button>
      </div>
      </form>
    </FormProvider>
  )
}

export default ManagingHotelForm