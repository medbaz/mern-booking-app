
import logo from '../assets/secondLogo-removebg.png'
import {Link} from 'react-router-dom'
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for the hamburger and close button
import { useAppContext } from '../context/AppContext';
import Logout from '../components-side/Logout'

const Header:React.FC=()=>{
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const {isLoggedIn} = useAppContext()

  return (
    <header className="bg-blue-600 px-4 sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={'/'}>
          <img className="text-white font-thin w-28 cursor-pointer" src={logo} alt="Logo" />
        </Link>
        <div className="flex md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes className="text-white text-2xl" /> : <FaBars className="text-white text-2xl" />}
          </button>
        </div>
        <nav className={`flex-col md:flex-row md:flex md:justify-between md:relative  items-center md:top-0 md:py-2 md:px-2  md:gap-8 ${isMobileMenuOpen ? 'flex py-5 px-3 rounded-sm gap-4 absolute top-12 right-0 bg-blue-600 ' : 'hidden'} md:block`}>
          <ul className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 font-medium uppercase text-white">
            <li className="hover:text-gray-200 cursor-pointer"><Link to={'/'}>Home</Link></li>
            { isLoggedIn && <>
            <li className="hover:text-gray-200 cursor-pointer"><Link to={'/myBookings'}>Bookings</Link></li>
            <li className="hover:text-gray-200 cursor-pointer"><Link to={'/myHotels'}>Hotels</Link></li>
            </>
            }
            <li className="hover:text-gray-200 cursor-pointer"><Link to={'/About'}>About</Link></li>
          </ul>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
          { isLoggedIn ? <Logout/>
          :<>
            <Link to={'/Sign In'}><button className="bg-white hover:bg-blue-800 hover:text-white text-blue-500 font-bold py-2 px-4 rounded">Login</button></Link>
            <Link to={'/Sign Up'}><button className="bg-white hover:bg-blue-800 hover:text-white text-blue-500 font-bold py-2 px-4 rounded">Sign Up</button></Link>
            </> 
            }
          </div>
          
        </nav>
      </div>
    </header>
  );
}

export default Header;

