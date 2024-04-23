import { Schema,Types, model } from "mongoose";

import { userSchema } from "./user";

export interface review{
    // productName:string;
    // rating:number;
    email:string;
  comments:string;
  // platformExperience:string
  user: Schema.Types.ObjectId;
username:string;
  createdAt:Date
}

 const reviewSchema = new Schema<review>({
    // productName: {
    //   type: String,
    //   required: true
    // },
    username: {
      type: String,
      required: true
    },
    // rating: {
    //   type: Number,
    //   required: true,
    //   min: 1,
    //   max: 5
    // },
    comments: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    // platformExperience: {
    //   type: String,
    //   required: true
    // },
    user: {
      type:Schema.Types.ObjectId,
      ref: 'user', 
      required: true
    },
   
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  export  const reviewModel = model<review>('review',reviewSchema)
  