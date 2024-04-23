import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart } from 'src/app/models/cart';
import { cartitem } from 'src/app/models/cartitem';
import { dynamiccartitem } from 'src/app/models/dynamiccartitem';
import { CartService } from 'src/app/shared/cart.service';
import { DynamicService } from 'src/app/shared/dynamic.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
product!:cart;
products!:any;

  cart!: cart;
  
  items: any;

  constructor(private cartservice: CartService,private zone: NgZone) {
    this.cartservice.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {
    this.cartservice.getCartObservable().subscribe((cart: cart) => {
      this.cart = cart;
      this.items = this.cart.items; // Update the items list
  }
  )}

  removeFromCart(cartItem: cartitem) {
    this.cartservice.removeFromCart(cartItem.itm.id);
  }
  incrementQuantity(cart: any) {
    this.zone.run(() => {
      cart.quantity++;
      this.changeQuantity(cart, cart.quantity);
    });
  }
  
  // Decrement the quantity
  decrementQuantity(cart: any) {
    if (cart.quantity > 1) {
      this.zone.run(() => {
        cart.quantity--;
        this.changeQuantity(cart, cart.quantity);
      });
    }
  }
  changeQuantity(cartItem: cartitem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartservice.changeQuantity(cartItem.itm.id, quantity);
  }

}


