import { profile } from "./profile";

export interface Review {
  _id?: string;
  productId: string;
user?:string
  rating: number;
  comment: string;
  createdAt?: Date;
  userProfile?: profile[];
  
}