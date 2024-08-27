import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as apiQuery from '../API_client' ;
import {useAppContext} from '../context/AppContext' ;
import { useNavigate } from 'react-router-dom';


function Logout() {
const queryClient = useQueryClient()
const {showToast} = useAppContext()
const navigate = useNavigate()

const mutitation =  useMutation({
    mutationFn:apiQuery.logoutUser,
    onSuccess : async () => {
        await queryClient.invalidateQueries({ queryKey:['tokenValidation'],exact:true})
        showToast({message:'Logged out successfully', type:'SUCCESS'})
        navigate('/')
    },
    onError : () => {
        showToast({message:'unable to log out', type:'ERROR'})
    }
})

    const handleSubmit = ()=>{
        mutitation.mutate()
    }
  return (
    <button onClick={handleSubmit} className="bg-white hover:bg-blue-800 hover:text-white text-blue-500 font-bold py-2 px-4 rounded">Log Out</button>
  )
}

export default Logout