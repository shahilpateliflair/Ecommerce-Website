import { Injectable } from '@angular/core';
import { wishlist } from '../models/wishlist';
import { wishlistitem } from '../models/wishlistitem';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { product } from '../models/products';
import { UPLOAD_PRODUCT } from './constants/urls';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  
  getCartItems(): wishlistitem[] {
    return this.dynamiccart.items;
  }
  
 

private dynamiccart:wishlist = this.getCartFromLocalStorage();

private dynamiccartSubject : BehaviorSubject<wishlist> =new BehaviorSubject(this.dynamiccart)
  constructor(private http:HttpClient) { 
    // const savedWishlist = localStorage.getItem('wishlist');
    // if (savedWishlist) {
    //   this.dynamiccart = JSON.parse(savedWishlist);
    // }
  }

  isProductInWishlist(productId: string): boolean {
    return this.dynamiccart.items.some(item => item.itm._id === productId);
  }
 
  addToCart(item: product, size: string, color: string): void {
    let cartItem = this.dynamiccart.items.find(wishlistItem => wishlistItem.itm._id === item._id);
  
    if (!cartItem) {
      const newCartItem = new wishlistitem(item, size, color); 
      this.dynamiccart.items.push(newCartItem);
      this.setCartToLocalStorage(this.dynamiccart);
    }
  }
  

  removeFromCart(itemId: string): void {
    let wishlist = this.dynamiccartSubject.value;
    wishlist.items = wishlist.items.filter(item => item.itm._id !== itemId);
    this.updateLocalStorage(wishlist);
  }
  updateLocalStorage(wishlist: wishlist): void {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    this.dynamiccartSubject.next(wishlist);
  }


getTotalItems(): number {
  return this.dynamiccart.items.length;
}

getTotalPrice(): number {
  return this.dynamiccart.items.reduce((total, item) => total + item.itm.price, 0);
}
clearCart(){
  this.dynamiccart=new wishlist();
  this.setCartToLocalStorage(this.dynamiccart);
}

getCartObservable():Observable<wishlist>{
  return this.dynamiccartSubject.asObservable();
}

getCart():wishlist{
return this.dynamiccartSubject.value;
}
uploadImage(image: File) {
  const formData = new FormData();
  formData.append('profileImage', image);
  return this.http.post<any>(UPLOAD_PRODUCT, formData);
  // return this.http.post<any>('http://localhost:42000/upload', formData);
}
public setCartToLocalStorage(wishlist: wishlist): void {
  const cartJson = JSON.stringify(wishlist);
  localStorage.setItem('wishlist', cartJson);
  this.dynamiccartSubject.next(wishlist);
}

public getCartFromLocalStorage():wishlist{
  const cartJson=localStorage.getItem('wishlist');
  // return cartJson? JSON.parse(cartJson): new dynamiccart();
  if (cartJson) {
    this.dynamiccart = JSON.parse(cartJson);
    
    // Initialize selectedSize and selectedColor for each cart item
    this.dynamiccart.items.forEach((item: wishlistitem) => {
      item.selectedSize = item.size;
      item.selectedColor = item.color;
    });
  } else {
    this.dynamiccart = new wishlist();
  }
  return this.dynamiccart;
 
}
isAddedToWishlist(productId: string): boolean {
  return this.dynamiccart.items.some((wishlistItem: wishlistitem) => wishlistItem.itm._id === productId);
}

}


