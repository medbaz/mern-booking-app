import mongoose from "mongoose";
import bcrypt from "bcryptjs"

export type userType = {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;

}


const UserSchema: mongoose.Schema = new mongoose.Schema(
    {
        firstname : {
            type:String ,
            required : true 
        } ,
        lastname : {
            type:String ,
            required : true 
        } ,
        email : {
            type:String ,
            required : true ,
            unique : true
        } ,
        password : {
            type:String ,
            required : true 

        }
    }
)


UserSchema.pre('save', async function EncrypPass(next) {
   if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password as string  , 10)
   } 
    next()
})




export const UsersModels = mongoose.model<userType>('UsersModels', UserSchema)