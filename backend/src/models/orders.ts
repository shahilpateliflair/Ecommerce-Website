import { Schema,Types, model } from "mongoose";
import { item, itemSchema } from "./item";
import { orderStatusEnum } from "../constants/order_status";
import { userSchema } from "./user";
import { products } from "./product";
import { product } from "./product";
// Define the schema for cart items
const cartItemSchema = new Schema({
    itm: { type: Schema.Types.ObjectId, ref: 'Item', required: true }, // Assuming 'Item' is the model for your item schema
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: String }, 
    color: { type: String },

  });
  export class CartItem {
    static map(arg0: (item: any) => { price_data: { currency: string; product_data: { name: any; description: any; images: any[]; }; unit_amount: number; }; quantity: any; }) {
      throw new Error("Method not implemented.");
    }
    public item: product; // Assuming Item is the type of your item object
  
    constructor(item: product) {
      if (!item) {
        throw new Error('Item cannot be undefined or null');
      }
  
      this.item = item;
    }
  
    quantity: number = 1;
  
    get price(): number {
      // Check if the item object and its price property are defined
      if (this.item && typeof this.item.price === 'number') {
        return this.item.price;
      } else {
        throw new Error('Item price is undefined or not a number');
      }
    }
  }
  // Define the schema for orders
  const orderSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    alteraddress: { type: String },
  altermobile: { type: Number },
  altername: { type: String },
  mobile: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    items: [cartItemSchema], // Define items as an array of cartItemSchema
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming 'User' is the model for your user schema
    paymentId: { type: String },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: 'NEW' }
  });
export const ordersModel = model('orders', orderSchema)


// >>>>>>>>>>>>>>>>>>>>>



