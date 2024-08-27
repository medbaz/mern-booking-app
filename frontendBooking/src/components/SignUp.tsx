import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import { useMutation , useQueryClient  } from '@tanstack/react-query';
import * as apiQuery from '../API_client' ;
import {useAppContext} from '../context/AppContext' ;


 export type LoginformTypes = {
        firstname : {
            type:string,
            required:true
        } ;
        lastname : {
            type:string,
            required:true
        } ; 
        email : {
            type:string,
            required:true
        };
        password : {
            type:string,
            required:true
        };
        confirmPassword : {
            type:string,
            required:true
        }
    }

// SIGN UP COMPONENT 
const SignUp:React.FC=()=>{
    
const {register , watch , handleSubmit , formState:{errors}} = useForm<LoginformTypes>()
const {showToast} = useAppContext()
const navigate = useNavigate()
const queryClient =  useQueryClient()


// ADD USER TO DB
const mutation = useMutation({
  mutationFn:apiQuery.register ,
  onSuccess: async (data) =>{
     showToast({message:data.message , type:"SUCCESS"})
     queryClient.invalidateQueries({ queryKey:['tokenValidation'],exact:true})
     navigate('/')

  },
  
  onError : (error)=> {
    return showToast({message:error.message , type:"ERROR"})
    
  }
})



const onsubmit = handleSubmit((data)=>{return mutation.mutate(data) })
  return (
    <form onSubmit={onsubmit} className="flex flex-col m-auto max-w-[700px]  gap-3 px-12 py-6 rounded-sm  ">
        <h2 className="text-2xl font-bold mb-5  text-white  text-center p-4 rounded-md bg-blue-950">Welcome please sign up to have access</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <label
          className=" text-gray-700 text-sm font-bold  flex-1"
          htmlFor="firstname"
        >
          First Name
          <input
             
            type="text"
            id="firstname"
            className="w-full px-3 py-2 border-2  rounded-md focus:outline-none mt-2  focus:ring focus:border-blue-500 "
            {...register("firstname", { required: "please enter your first name" })}
          />
        {errors.firstname && (<p className='text-red-600 font-semibold  ' >{errors.firstname.message}</p>)}
        </label>

        <label
          className="block text-gray-700 text-sm font-bold  flex-1"
          htmlFor="lastname"
        >
          Last Name
          <input
            type="text"
            
            id="lastname"
            className="w-full px-3 py-2 border-2 rounded-md focus:outline-none mt-2 focus:ring focus:border-blue-500 "
            {...register("lastname", { required: "please enter your last name" })}
          />
             {errors.lastname && (<p className='text-red-600 font-semibold  ' >{errors.lastname.message}</p>)}
        </label>
      </div>

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

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "please enter a password";
              } else if (watch("password") !== val) {
                return "the password doesnt match";
              }
            },
          })}
        />
        {errors.confirmPassword && (<p className='text-red-600 font-semibold  ' >{errors.confirmPassword.message}</p>)}
      </div>

      <button
        type="submit"
        name='Create account'
        className="w-40 bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
      >
        Create account
      </button>
    </form>
  );
}

export default SignUp