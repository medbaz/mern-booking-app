import express , {Router,Request,Response}  from "express";
import {addUser,login,logout} from '../controllers/auth.controllers';
import  auth_validation  from "../middlewares/auth_validation";

const router = express.Router()




router.post('/sign_up',addUser)
router.post('/login',login)
router.post('/logout',logout)

router.get('/validation',auth_validation,(req:Request,res:Response)=>{
    res.status(200).send({userId:req.userId})
})


export default router ;