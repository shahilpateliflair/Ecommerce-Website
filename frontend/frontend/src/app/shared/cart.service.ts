import { Injectable } from '@angular/core';
import { cart } from '../models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { item } from '../models/item';
import { cartitem } from '../models/cartitem';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  
  getCartItems(): cartitem[] {
    return this.cart.items; 
  }
  

private cart:cart = this.getCartFromLocalStorage();
private cartSubject : BehaviorSubject<cart> =new BehaviorSubject(this.cart)
  constructor() { }

removeFromCart(itemId:string):void{
this.cart.items= this.cart.items.filter(item => item.itm.id != itemId)
this.setCartToLocalStorage();
}

changeQuantity(itemId:string,quantity:number){
let cartItem = this.cart.items.find(item => item.itm.id === itemId)//check after


if(!cartItem) return;

cartItem.quantity=quantity;
cartItem.price=quantity*cartItem.itm.price;
this.setCartToLocalStorage();
}

clearCart(){
  this.cart=new cart();
  this.setCartToLocalStorage();
}

getCartObservable():Observable<cart>{
  return this.cartSubject.asObservable();
}

getCart():cart{
return this.cartSubject.value;
}

private setCartToLocalStorage():void{
  this.cart.TotalPrice=this.cart.items.reduce((prevSum,curretItem)=> prevSum+curretItem.price,0)
this.cart.TotalCount=this.cart.items.reduce((prevSum,curretItem)=> prevSum+curretItem.quantity,0);
  
const cartJson = JSON.stringify(this.cart)

localStorage.setItem('cart',cartJson)
this.cartSubject.next(this.cart);
}

private getCartFromLocalStorage():cart{
  const cartJson=localStorage.getItem('cart');
  return cartJson? JSON.parse(cartJson): new cart();
 
}
}

