import { Injectable } from '@angular/core';
// import { cart } from '../models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { item } from '../models/item';
// import { cartitem } from '../models/cartitem';
import { dynamiccartitem } from '../models/dynamiccartitem';
import { product } from '../models/products';
import { dynamiccart } from '../models/dynamiccart';
import { HttpClient } from '@angular/common/http';
import { UPLOAD_PRODUCT } from './constants/urls';
@Injectable({
  providedIn: 'root'
})
export class DynamicService {
  

  getCartItems(): dynamiccartitem[] {
    return this.dynamiccart.items;
  }
  
  getTotalPrice(): number {
    return this.dynamiccart.TotalPrice; 
  }

private dynamiccart:dynamiccart = this.getCartFromLocalStorage();

private dynamiccartSubject : BehaviorSubject<dynamiccart> =new BehaviorSubject(this.dynamiccart)
  constructor(private http:HttpClient) { }

 
addToCart(item: product,size: string, color: string): void {
  let cartItem = this.dynamiccart.items.find(item => item.itm._id === item._id);
  // let cartItem = this.cart.items.find(cartItem => itm.id === itm.id);

  if (!cartItem) {
    const newCartItem = new dynamiccartitem(item,size, color); 
   
    this.dynamiccart.items.push(newCartItem);
    this.setCartToLocalStorage();
    
  }
 
}

removeFromCart(itemId:string):void{
this.dynamiccart.items= this.dynamiccart.items.filter(item => item.itm._id != itemId)
this.setCartToLocalStorage();
}

changeQuantity(itemId:string,quantity:number){
let cartItem = this.dynamiccart.items.find(item => item.itm._id === itemId)//check after


if(!cartItem) return;

cartItem.quantity=quantity;
cartItem.price=quantity*cartItem.itm.price;
this.setCartToLocalStorage();
}

clearCart(){
  this.dynamiccart=new dynamiccart();
  this.setCartToLocalStorage();
}

getCartObservable():Observable<dynamiccart>{
  return this.dynamiccartSubject.asObservable();
}

getCart():dynamiccart{
return this.dynamiccartSubject.value;
}

uploadImage(image: File) {
  const formData = new FormData();
  formData.append('profileImage', image);
 
  // return this.http.post<any>('http://localhost:42000/upload', formData);
  return this.http.post<any>(UPLOAD_PRODUCT, formData);
}

private setCartToLocalStorage():void{
  this.dynamiccart.TotalPrice=this.dynamiccart.items.reduce((prevSum,curretItem)=> prevSum+curretItem.price,0)
this.dynamiccart.TotalCount=this.dynamiccart.items.reduce((prevSum,curretItem)=> prevSum+curretItem.quantity,0);
  
const cartJson = JSON.stringify(this.dynamiccart)

localStorage.setItem('cart',cartJson)
this.dynamiccartSubject.next(this.dynamiccart);
}
public getCartFromLocalStorage():dynamiccart{
  const cartJson=localStorage.getItem('cart');
  
  if (cartJson) {
    this.dynamiccart = JSON.parse(cartJson);
    
   
    this.dynamiccart.items.forEach((item: dynamiccartitem) => {
      item.selectedSize = item.size;
      item.selectedColor = item.color;
    });
  } else {
    this.dynamiccart = new dynamiccart();
  }
  return this.dynamiccart;
 
}
}



