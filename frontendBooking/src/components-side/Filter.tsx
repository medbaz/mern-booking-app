import React , {useState} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"; 
import {  useNavigate } from 'react-router-dom';
import { useSearchContext } from '../context/SearchContext';


const Filter = ()=> {
  
    const Search = useSearchContext()


    const [destination,setDestination] = useState<string>(Search.destination)
    const [checkIn,setCheckIn] = useState<Date>(Search.checkIn)
    const [checkOut,setCheckOut] = useState<Date>(Search.checkOut)
    const [adultCount,setAdultCount] = useState<number>(Search.adultCount)
    const [childCount,setChildCount] = useState<number>(Search.childCount)


    const minDate = new Date()
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 1 )






    const navigate = useNavigate()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents the form from submitting
        Search.saveSearchValues(destination,checkIn,checkOut,adultCount,childCount)
        navigate('/Hotels')
      };

  return (
    <div className=" max-w-4xl mx-auto p-2">
      <div className="bg-gray-800 w-full p-3 rounded-xl ">
        <form onSubmit={(event) => handleSubmit(event)} className="flex flex-col md:flex-row  md:justify-between gap-4  md:gap-2 " >
          {/* Location Filter */}
          <div className="flex flex-col md:w-[25%] ">
            <label htmlFor="location" className="text-gray-300  mb-2">
              Where are you going?
            </label>
            <input
              type="text"
              id="location"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter a destination"
              className="p-2 h-10 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          {/* Check-in/Check-out Filter */}
          <div className="flex flex-col md:w-[25%]  ">
            <label htmlFor="dates" className="text-gray-300  f mb-2">
              Check-in / Check-out
            </label>
            <div className="flex space-x-1  justify-between   items-center">
                <DatePicker
                className="w-[100%] p-2 h-10 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                onChange={(date) => setCheckIn(date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                selected={checkIn}
                wrapperClassName='flex-1'
                />

              <span className="text-gray-300"> / </span>

              <DatePicker
                className="w-[100%] p-2 h-10 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                onChange={(date) => setCheckOut(date as Date)}
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                selected={checkOut}
                wrapperClassName='flex-1'
                />
            </div>
          </div>
          {/* Adults/Children Filter */}
          <div className="flex flex-col md:w-[25%] ">
            <label
              htmlFor="guests"
              className="text-gray-300 font-semibold mb-2"
            >
              Guests
            </label>
            <div className="flex space-x-2 ">
              <select
                id="adults"
                className="w-[50%] p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                onChange={(e) => setAdultCount(Number(e.target.value))}
                value={adultCount}
              >
                <option value={1}>1 Adult</option>
                <option value={2}>2 Adults</option>
                <option value={3}>3 Adults</option>
                <option value={4}>4 Adults</option>
              </select>
              <select
                id="children"
                className="w-[50%] p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                onChange={(e) => setChildCount(Number(e.target.value))}
                value={childCount}
              >
                <option value={0}>0 Children</option>
                <option value={1}>1 Child</option>
                <option value={2}>2 Children</option>
                <option value={3}>3 Children</option>
              </select>
            </div>
          </div>
          {/* Search Button */}
          <div className="flex flex-col w-44 justify-end  mb-1">
 
            <button
              type="submit"
              className="w-28 bg-teal-500 hover:bg-teal-600 text-white font-bold  text-center   py-2 rounded-xl shadow-lg ">
              Search
            </button>
          
           
          </div>
        </form>
      </div>
    </div>
  )
}

export default Filter


