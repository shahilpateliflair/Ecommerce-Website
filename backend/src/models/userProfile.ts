import { Schema, model } from 'mongoose';

interface profile {
  name: string;
  email: string;
  mobile: number;
  mobile1: number;
  address1?: string;
  address2?: string;
  postcode?: number;
  state?: string;
  age?: number;
  country?: string;
  imageUrl:String,
  user:String,
//   profilePictureUrl: String 
}

const profileSchema = new Schema<profile>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number },
  mobile1: { type: Number },
  address1: { type: String },
  address2: { type: String },
  postcode: { type: Number },
  state: { type: String },
  age: { type: Number },
  imageUrl: { type: String, },
  country: { type: String },
 
});

export default model<profile>('Profile', profileSchema);