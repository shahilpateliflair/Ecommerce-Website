import { Schema,model } from "mongoose";

export interface item{
    id:string
    name:string
    description:string;
    price:number;
    MRP:number;
    off:number;
    tag:string[];
    favorite:boolean;
    stars:number;
    imageUrl:string;
    origins:string[];
    deliverTime:string[];
}

export const menSchema = new Schema<item>({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    MRP:{type:Number,required:true},
    off:{type:Number,required:true},
    stars:{type:Number,required:true},
    tag:{type:[String]},
    favorite:{type:Boolean,default:false},
    imageUrl:{type:String,required:true},
    origins:{type:[String],required:true},
    deliverTime:{type:[String],required:true}
},{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
    timestamps:true
})

export  const MenModel = model<item>('men',menSchema)
