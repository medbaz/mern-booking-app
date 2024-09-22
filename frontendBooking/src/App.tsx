
import './index.css'
import Layout from './layout/layout';
import Homme from './components/Homme';
import About from './components/About.tsx';
import Bookings from './components/Bookings';
import AddHotels from './components/AddHotels.tsx';
import MyHotels from './components/MyHotels.tsx';
import SignIn from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.tsx";
import { useAppContext } from './context/AppContext';
 

import { BrowserRouter as Router , Routes , Route,Navigate } from 'react-router-dom';
import HotelDetails from './components/HotelDetails.tsx';
import EditHotels from './components/EditHotel.tsx';
import Hotels from './components/Hotels.tsx';
function App() {
  const {isLoggedIn} = useAppContext()


  return (
      <Router>
        <Routes >
            <Route index path='/' element={<Layout> <Homme/></Layout>}>
            </Route>

              <Route path='myBookings' element={<Layout>{isLoggedIn ?<Bookings/>: <Navigate to={'/Sign In'}/>}</Layout>}>
              </Route>

              <Route path='addHotels' element={<Layout>{isLoggedIn ? <AddHotels/> : <Navigate to={'/Sign In'}/>}</Layout>}>
              </Route>

              <Route path='editHotel/:id' element={<Layout>{isLoggedIn ? <EditHotels/> : <Navigate to={'/Sign In'}/>}</Layout>}>
              </Route>

              <Route path='myHotels' element={<Layout>{isLoggedIn ? <MyHotels/> : <Navigate to={'/Sign In'}/>}</Layout>}>
              </Route>

              <Route path='Hotels' element={<Layout><Hotels/></Layout>}>
              </Route>

              <Route path='HotelDetails/:id' element={<Layout>{isLoggedIn ? <HotelDetails />  : <Navigate to={'/Sign In'}/>}</Layout>}>
              </Route>
            
              <Route path='Sign In' element={<Layout><SignIn/></Layout>}>
              </Route>

              <Route path='Sign Up' element={<Layout><SignUp/></Layout>}>
              </Route>

              <Route path='About' element={<Layout><About/></Layout>}>
              </Route>

              {/* CATCH ALL ROUTE */}
              <Route path='*' element={<Navigate to={"/"}/>}> 
              </Route>
        </Routes>
      </Router>
  )
}

export default App ;