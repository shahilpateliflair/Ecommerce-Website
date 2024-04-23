import { product } from "./products";

export class dynamiccartitem{
    _id: any;
    size: string;
    color: string;
    selectedSize: string = ''; // Add initializer
    selectedColor: string = ''; 
    product?: any;
  
    constructor( public itm:product,size: string, color: string){
      this.size = size;
      this.color = color;
     
    }

  quantity:number =1;
  price:number=this.itm.price;
}