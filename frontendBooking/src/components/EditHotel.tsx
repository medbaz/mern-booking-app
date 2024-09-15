import {  useQuery ,useMutation } from '@tanstack/react-query'
import * as apiQuery from '../API_client' ;
import ManagingHotelForm from '../forms/managingHotelForm/ManagingHotelForm'
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';



const EditHotel:React.FC=()=>{

const {id} = useParams()

const { data } = useQuery({
  queryKey: ["fetchTheHotel"],
  queryFn: ()=> apiQuery.fetchHotelById(id ||''),
  enabled: !!id
}
);

const {showToast} = useAppContext()


const { mutate , isPending } = useMutation({
  mutationFn:(formData:FormData)=> apiQuery.editHotelById(formData,id || ''),
  onSuccess() {
    showToast({message:"Hotel updated Successfully",type:"SUCCESS"})
  },
  onError(error) {
    showToast({message:error.message,type:"ERROR"})
  },
})


const handleSave = (formData:FormData)=>{
  mutate(formData)
}





  return (
    <div className='pb-20'>
      <ManagingHotelForm onSave={handleSave}  hotel={data } isPending={isPending} /> 
    </div>
  )
}

export default EditHotel