import { model } from "mongoose";

const mongoose = require('mongoose');

export interface product1{
  name: String,
  description: String,
  price: Number,
  
  id:String,
  MRP:Number,
  off:Number,
  image:[String],
  tag:String,
 

  origins:String,
  deliverTime:String,
  category: string;
};
const product1Schema = new mongoose.Schema({
  name:{type:String,required:true},
  description:{type:String,required:true},
  category: { type: String, required: true },
  price:{type:Number,required:true},
  MRP:{type:Number},
  off:{type:Number,required:true},
  tag:{type:String,required:true},

  
  origins:{type:[String],required:true},
  deliverTime:{type:[String],required:true},
  images: [String] 
});
export  const products1 = model<product1>('products1',product1Schema)

