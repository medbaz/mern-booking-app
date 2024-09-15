import React from 'react';
import { useFormContext } from 'react-hook-form';
import { HotelsFormTypes } from './ManagingHotelForm';

const ImageSection:React.FC = ()=> {
    // const [fileNames, setFileNames] = useState<string[]>([]);
    const {register,watch,formState:{errors},setValue} = useFormContext<HotelsFormTypes>()
 
    const imageFiles = watch('imageFiles')
    const createdImageUrls = watch('imageUrls')

    const handleDlete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> , imgUrl:string)=>{
      event.preventDefault()
      setValue('imageUrls',createdImageUrls.filter((url)=>{return url != imgUrl}))

    }
   

    return (
      <div className=" p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Upload Images
        </h2>
        {createdImageUrls &&
        <div className="mb-10 h-60 ">
           
            <div className='h-60  grid grid-cols-6 gap-2'>
              {createdImageUrls.map((file) => (
                <div className='relative group'>
                <img src={file} alt="" className=' border-gray-400 border-2 h-full w-full object-cover' />
                <button onClick={(event)=> handleDlete(event,file)} className='absolute inset-4 bg-red-700 opacity-10   group-hover:opacity-80'>Delete</button>
                </div>
              ))}
            </div>
        
        </div>}

        <div className="flex items-center">
          <input
            type="file"
            id="imageFiles"
            accept="image/*"
            multiple
            className="hidden"
            //   onChange={handleFileChange}
            {...register("imageFiles", {
              
              validate: (imageFiles) => {
                if ((imageFiles.length + createdImageUrls?.length) > 6) {
                  return "enter less then 6 images";
                } else if ((imageFiles.length + createdImageUrls?.length) == 0) {
                 return "images are required"
                }}
            })}
          />
          <label
            htmlFor="imageFiles"
            className=" min-w-[145px] bg-blue-500 text-white py-4 px-4 rounded-md cursor-pointer hover:bg-blue-600 transition duration-200"
          >
            Choose Images
          </label>
          <div className="ml-4 w-full overflow-hidden overflow-ellipsis whitespace-nowrap bg-gray-100 border border-gray-300 p-4 rounded-md text-gray-600">
            
            {imageFiles && Array.from(imageFiles).length > 0 ? (
              Array.from(imageFiles).map((file) => '- ' + file.name + ' -') 
            ) : (
              <li className="text-gray-500">(No files selected)</li>
            )}
          </div>
        </div>
        {errors.imageFiles && (
          <p className="text-red-600 font-semibold ">
            {errors.imageFiles.message}
          </p>
        )}
      </div>
    );
    };

export default ImageSection;
