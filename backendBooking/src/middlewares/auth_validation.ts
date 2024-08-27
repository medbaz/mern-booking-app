import  jwt , {JwtPayload} from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import  'dotenv/config'
// import { global } from "fs";


declare global  {
    namespace Express {
        interface Request {
            userId:string
        }
    }
}


const auth_validation = (req:Request,res:Response,next:NextFunction)=>{
    const token =  req.cookies['auth_token']
console.log('this is the token from controllers',token);

    if (!token) {
        return res.status(401).json({message:'authentification not granted ther is no token'})
    }
    try {
        const decoded = jwt.verify(token,process.env.ENCYPT_TOKEN_KEY as string)
        req.userId = (decoded as JwtPayload).user_id
        next()
        
    } catch (error) {
        return res.status(401).json({message:'authentification not granted'})
    }

    
     
     
}
export  default auth_validation 