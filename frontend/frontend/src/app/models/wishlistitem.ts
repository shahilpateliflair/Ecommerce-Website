import { product } from "./products";

export class wishlistitem{
    _id: any;
    size: string;
    color: string;
    selectedSize: string = ''; 
    selectedColor: string = ''; 
  // items: any;
    constructor( public itm:product,size: string, color: string){
      this.size = size;
      this.color = color;
    }

  quantity:number =1;
  price:number=this.itm.price;
}