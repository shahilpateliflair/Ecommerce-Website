import { cartitem } from './cartitem';
import { dynamiccartitem } from './dynamiccartitem';

export class orders {
  id!: number;
  name!: string;
 altername!:string;

  mobile!:number;
  altermobile!:number;
  totalPrice!: number;
  items!: dynamiccartitem[];

  address!: string;
  alteraddress!:string;
  // addressLatLng?= LatLng;
  paymentId!: string;
  createdAt!: string;
  status!: string;
  size!: string;
  color!: string;
  selectedSize!:string;
  selectedColor!:string;
}
