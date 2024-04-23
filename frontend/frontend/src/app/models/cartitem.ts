import { item } from "./item";

export class cartitem{
  id: any;
 
  // items: any;
    constructor( public itm:item,){
    }

  quantity:number =1;
  price:number=this.itm.price;
}