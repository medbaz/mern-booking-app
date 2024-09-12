import express , {Request,Response} from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
// ROUTES
import userRouter from './routs/user.routs'
import authRouter from './routs/auth.routs'
import hotelsRouter from './routs/hotels.routs'

import cookieParser from 'cookie-parser';
import path from "path"
import { v2 as cloudinary } from 'cloudinary'




const PORT = process.env.PORT || 3000;
const app = express()


cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})








app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
  origin : process.env.FRONTEND_BASE_URL,
  credentials:true ,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}))



app.use(express.static(path.join(__dirname, '../../frontendBooking/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontendBooking/dist'));
});


app.use('/api/users',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/myHotels',hotelsRouter)


mongoose.connect(process.env.DB_CONNECTION_SETUP as string).then(()=>{

    console.log("connected",process.env.DB_CONNECTION_SETUP)
    app.listen(PORT)
  }
  ).catch(()=>{
    console.log("not connected to te DB")
  })


