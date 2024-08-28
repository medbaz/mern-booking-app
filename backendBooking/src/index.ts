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
      defaultSrc: ["'self'"], // Allow resources from the same origin
      scriptSrc: ["'self'", "blob:"], // Allow scripts from the same origin and blobs
      scriptSrcElem: ["'self'", "blob:"], // Explicitly allow blob script elements
      imgSrc: ["'self'", "data:"], // Allow images from the same origin and inline data
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow styles from the same origin and inline styles
      connectSrc: ["'self'", "https:"], // Allow connections to the same origin and HTTPS
      objectSrc: ["'none'"], // Disallow all <object> embeds
      baseUri: ["'self'"], // Disallow <base> URI changes
    },
  })
);





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




mongoose.connect(process.env.DB_CONNECTION_SETUP as string).then(()=>{

    console.log("connected",process.env.DB_CONNECTION_SETUP)
    app.listen(PORT)
  }
  ).catch(()=>{
    console.log("not connected to te DB")
  })


