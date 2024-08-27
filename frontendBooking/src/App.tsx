
import './index.css'
import Layout from './layout/layout';
import Homme from './components/Homme';
import About from './components/About.tsx';
import Bookings from './components/Bookings';
import Hotels from './components/Hotels.tsx';
import SignIn from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.tsx";
import { useAppContext } from './context/AppContext';


import { BrowserRouter as Router , Routes , Route,Navigate } from 'react-router-dom';
function App() {
  const {isLoggedIn} = useAppContext()


  return (
      <Router>
        <Routes >
          {/* this is the old routing method that doesnt give a way to check the type of rendered component  */}
          {/* <Route path='/' element={<Layout/>} >
            <Route index path='/' element={<Homme/>}>
            </Route>
            <Route path='Book' element={<Book/>}>
            </Route>
            <Route path='About' element={<About/>}>
            </Route>
            <Route path='Sign In' element={<SignIn/>}>
            </Route>

          </Route> */}
          
            <Route index path='/' element={<Layout> <Homme/></Layout>}>
            </Route>

              <Route path='myBookings' element={<Layout>{isLoggedIn ?<Bookings/>: <Navigate to={'/Sign In'}/>}</Layout>}>
              </Route>

              <Route path='myHotels' 

              element={<Layout>{isLoggedIn ? <Hotels/> : <Navigate to={'/Sign In'}/>}</Layout>}>

              </Route>

              <Route path='Sign In' element={<Layout><SignIn/></Layout>}>
              </Route>
              <Route path='Sign Up' element={<Layout><SignUp/></Layout>}>

            
            </Route>
            <Route path='About' element={<Layout><About/></Layout>}>
            </Route>
        </Routes>
      </Router>
  )
}

export default App ;