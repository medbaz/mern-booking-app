import React from 'react';
import { useFormContext } from 'react-hook-form';
import { HotelsFormTypes } from './ManagingHotelForm';

const ImageSection:React.FC = ()=> {
    // const [fileNames, setFileNames] = useState<string[]>([]);
    const {register,watch,formState:{errors}} = useFormContext<HotelsFormTypes>()


    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   if (e.target.files) {
    //     const selectedFiles = Array.from(e.target.files).map((file) => file.name);
    //     setFileNames(selectedFiles);
    //   }
    // };
    
    const imageFiles = watch('imageFiles')

    return (
        <div className=" p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Upload Images</h2>
    
          <div className="flex items-center">
            <input
              type="file"
              id="imageFiles"
              accept="image/*"
              multiple
              className="hidden"
            //   onChange={handleFileChange}
              {...register('imageFiles',{required:"this field is required",validate:(imageFiles)=>{
                if (imageFiles.length > 6) {return "enter less then 6 images" }
              }})}

            />
            <label
              htmlFor="imageFiles"
              className=" min-w-[145px] bg-blue-500 text-white py-4 px-4 rounded-md cursor-pointer hover:bg-blue-600 transition duration-200"
            >
              Choose Images
            </label>
            <div className="ml-4 w-full overflow-hidden overflow-ellipsis whitespace-nowrap bg-gray-100 border border-gray-300 p-4 rounded-md text-gray-600">
              {/* {fileNames.length > 0 ? fileNames.join(', ') : 'No files chosen'} */}
              {imageFiles && Array.from(imageFiles).length > 0 ? (
              Array.from(imageFiles).map((file) => (
              
                 file.name
              ))
            ) : (
              <li className="text-gray-500">(No files selected)</li>
            )}

            </div>
          </div>
          {errors.imageFiles && (<p className='text-red-600 font-semibold ' >{errors.imageFiles.message }</p>)}

        </div>
      );
    };

export default ImageSection;
