import { useMutation } from '@tanstack/react-query'
import * as apiQuery from '../API_client' ;
import {useAppContext} from '../context/AppContext'


import ManagingHotelForm from '../forms/managingHotelForm/ManagingHotelForm'

const Hotels:React.FC=()=>{

const {showToast} = useAppContext()

const {mutate,isPending} = useMutation({
  mutationFn:apiQuery.addMyHotel,
  onSuccess:()=>{
    showToast({message:"Hotel Saved successfully",type:'SUCCESS'})
  } ,
  onError:()=>{
    showToast({message:"Cant Save Hotel",type:'ERROR'})
  }
})

const handleSave = (formData:FormData)=>{
  mutate(formData)
}
  return (
    <div className='pb-20'>
      <ManagingHotelForm onSave={handleSave} isPending={isPending} /> 
    </div>
  )
}

export default Hotels