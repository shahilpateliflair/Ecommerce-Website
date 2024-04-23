import { Schema,model } from "mongoose";

export interface user{
    headers: any;
    // id?:string;
    name:string;
    email:string;
    isAdmin:boolean;
    address:string;
    password:string
  
}

export const userSchema = new Schema<user>({
    // id:{type:String,required:true},
    name:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    address:{type:String,required:true},
    isAdmin:{type:Boolean,required:true}
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
}

)
export  const userModel = model<user>('user',userSchema)