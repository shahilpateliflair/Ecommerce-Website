
import mongoose, { Schema,model } from "mongoose";

// const mongoose = require('mongoose');

export interface product{
    name: String,
    description: String,
    price: Number,
    image:String
    id:String,
    MRP:Number,
    off:Number,
    // imageUrls: string[];
    imageUrl:String,
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    tag:String,
   
    // imageUrls: { color: string, imageUrl: string }[];
    origins:String,
    deliverTime:String,
    category: string;
};
export const productSchema = new Schema<product>({
    name:{type:String,required:true},
    description:{type:String,required:true},
    category: { type: String, required: true },
    price:{type:Number,required:true},
    MRP:{type:Number},
    off:{type:Number,required:true},
    tag:{type:String,required:true},
 
    imageUrl: { type: String, required: true },
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    image3: { type: String, required: true },
    image4: { type: String, required: true },
    
    origins:{type:[String],required:true},
    deliverTime:{type:[String],required:true}
    
})
export  const products = model<product>('products',productSchema)
