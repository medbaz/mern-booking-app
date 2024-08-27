import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useForm } from 'react-hook-form';
import { useMutation , useQueryClient } from '@tanstack/react-query';
import * as apiQuery from '../API_client' ;


export type SigninformTypes = {
  email : {
      type:string,
      required:true
  };
  password : {
      type:string,
      required:true
  }
}



const SignIn:React.FC=()=>{
  const {register  , handleSubmit , formState:{errors}} = useForm<SigninformTypes>()
  const {showToast} = useAppContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()




// Login 
  const mutation = useMutation({
    mutationFn:apiQuery.signIn,
    onSuccess:async (data)=>{
      showToast({message:data.message,type:'SUCCESS'});
      await queryClient.invalidateQueries({ queryKey:['tokenValidation'],exact:true}); 
      navigate('/')
    },
    onError:(error)=>{
      showToast({message:error.message,type:'ERROR'});
    },
  })


const onsubmit = handleSubmit((data)=>{return mutation.mutate(data)})
  return (
    
<form onSubmit={onsubmit} className="flex flex-col m-auto max-w-[700px]  gap-3 px-12 py-6 rounded-sm   "> 
<h2 className="text-2xl font-bold mb-5  text-white text-center p-4 rounded-md bg-blue-950">Welcome back</h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          {...register("email", { required: "please enter a valid email" })}
        />
        {errors.email && (<p className='text-red-600 font-semibold ' >{errors.email.message}</p>)}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          {...register("password", {
            required: "please enter a valid password",
            minLength: { value: 6, message: " password minimum lengh is 6" },
          })}
        />
        {errors.password && (<p className='text-red-600 font-semibold  ' >{errors.password.message}</p>)}
      </div>
      <button
        type="submit"
        className="w-40 bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
      >
        Sign In
      </button>
</form>
    
  )
}

export default SignIn