import express , {Request,Response} from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import userRouter from './routs/user.routs'
import authRouter from './routs/auth.routs'
import cookieParser from 'cookie-parser';
import path from "path"
import helmet from 'helmet'


const PORT = process.env.PORT || 3000;

const app = express()







app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "blob:"], // Allow scripts from the same origin and blobs
      objectSrc: ["'none'"],
      imgSrc: ["'self'", "data:"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'"],
      // Add other directives as needed
    },
  })
);





app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
  origin : process.env.FRONTEND_BASE_URL,
  credentials:true
}))

app.use(express.static(path.join(__dirname, '../../frontendbooking/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontendBooking/dist', 'index.html'));
});
app.use('/api/users',userRouter)
app.use('/api/auth',authRouter)




mongoose.connect(process.env.DB_CONNECTION_SETUP as string).then(()=>{

    console.log("connected",process.env.DB_CONNECTION_SETUP)
    app.listen(PORT)
  }
  ).catch(()=>{
    console.log("not connected to te DB")
  })


