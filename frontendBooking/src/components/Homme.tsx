

const Homme:React.FC=()=>{

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents the form from submitting
        console.log("Form submission prevented.");
        // You can handle other logic here if needed
      };

  return (
    <div className=" text-white  flex flex-col  h-full ">
        
          <h1 className="text-3xl font-bold container  text-center py-2 h-14 bg-gray-800" >Welcome to Our Website!</h1>
          <div className="bg-gray-900 p-2">

      <div className="container mx-auto">
        <div className="bg-gray-800 p-4 rounded-xl ">
          <form   onSubmit={(event)=>(handleSubmit(event))} className="grid grid-cols-1 md:grid-cols-4 gap-2 ">
            {/* Location Filter */}
            <div className="flex flex-col">
              <label htmlFor="location" className="text-gray-300 font-semibold mb-2">Where are you going?</label>
              <input 
                type="text" 
                id="location" 
                placeholder="Enter a destination" 
                className="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" 
              />
            </div>

            {/* Check-in/Check-out Filter */}
            <div className="flex flex-col minmax(0, 1fr) ">
              <label htmlFor="dates" className="text-gray-300  font-semibold mb-2">Check-in / Check-out</label>
              <div className="flex space-x-1 items-center">
                <input 
                  type="date" 
                  id="checkin" 
                  className=" w-[45%] p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" 
                />
                <span className="text-gray-300">/</span>
                <input 
                  type="date" 
                  id="checkout" 
                  className=" w-[45%] p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" 
                />
              </div>
                
             </div>

            {/* Adults/Children Filter */}
            <div className="flex flex-col minmax(0, 1fr)">
              <label htmlFor="guests" className="text-gray-300 font-semibold mb-2">Guests</label>
              <div className="flex space-x-2">
                <select 
                  id="adults" 
                  className="w-[45%] p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400">
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>3 Adults</option>
                  <option>4 Adults</option>
                </select>
                <select 
                  id="children" 
                  className="w-[45%] p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400">
                  <option>0 Children</option>
                  <option>1 Child</option>
                  <option>2 Children</option>
                  <option>3 Children</option>
                </select>
              </div>
              </div>
            

            {/* Search Button */}
            <div className="flex flex-col minmax(0, 1fr) justify-end mb-1">
              <button 
                type="submit" 
                className=" bg-teal-500 hover:bg-teal-600 text-white font-bold  text-center   py-2 rounded-xl shadow-lg">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
   
      </div>
    
  )
}

export default Homme