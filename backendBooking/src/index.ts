import express , {Request,Response} from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import userRouter from './routs/user.routs'
import authRouter from './routs/auth.routs'
import cookieParser from 'cookie-parser';
import path from "path"

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
  origin : process.env.FRONTEND_BASE_URL,
  credentials:true
}))

app.use(express.static(path.join(__dirname, '../../frontendbooking/dist')));
app.use('/api/users',userRouter)
app.use('/api/auth',authRouter)




mongoose.connect(process.env.DB_CONNECTION_SETUP as string).then(()=>{

    console.log("connected",process.env.DB_CONNECTION_SETUP)
    app.listen(3000)
  }
  ).catch(()=>{
    console.log("not connected to te DB")
  })


