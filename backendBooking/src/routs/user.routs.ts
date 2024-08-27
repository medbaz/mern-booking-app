import express , {Router}  from "express";
import {getUsers,deleteUser} from '../controllers/user.controllers';


const router = express.Router()


router.get('/', getUsers )
router.delete('/deleteALL',deleteUser)


export default router ;