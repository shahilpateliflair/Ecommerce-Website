import { Component } from '@angular/core';
import { dynamiccart } from 'src/app/models/dynamiccart';
import { DynamicService } from 'src/app/shared/dynamic.service';
import { product } from 'src/app/models/products';
import { dynamiccartitem } from 'src/app/models/dynamiccartitem';
import { cart } from 'src/app/models/cart';
import { NgZone } from '@angular/core';
import { UPLOAD_IMAGE } from 'src/app/shared/constants/urls';
@Component({
  selector: 'app-dynamiccart',
  templateUrl: './dynamiccart.component.html',
  styleUrls: ['./dynamiccart.component.css']
})

export class DynamiccartComponent {
  product!:dynamiccart;
  products!:any;
  availableSizes: string[] = ['S', 'M', 'L', 'XL'];
  availableColors: string[] = ['Black', 'Blue', 'Gray','Red', 'White'];
    cart!: dynamiccart;
 
    
    items: any;
  
    constructor(private dynamic: DynamicService,private zone: NgZone) {
      this.dynamic.getCartObservable().subscribe((dynamiccart) => {
        this.cart = dynamiccart;
      });
    }
  
    ngOnInit(): void {
      const cartFromLocalStorage = this.dynamic.getCartFromLocalStorage();
    if (cartFromLocalStorage) {
      this.cart = cartFromLocalStorage;
    } else {
      // If cart data does not exist in local storage, initialize it from service
      this.dynamic.getCartObservable().subscribe((dynamiccart:dynamiccart) => {
        this.cart = dynamiccart;
      });
    }
  }
  
  

    getProductImageUrl(product: product): string {
    
      // return `http://localhost:42000/uploadimage/${product.imageUrl}`;
      return `${UPLOAD_IMAGE}${product.imageUrl}`;


      ;
    }

    getImageUrlByColor(color: string, items: any): string {
      switch (color) {
        case 'White':
          // return 'http://localhost:42000/uploadimage/' + items.imageUrl;
          return `${UPLOAD_IMAGE}` + items.imageUrl;
          
        case 'Gray':
          // return 'http://localhost:42000/uploadimage/' + items.image1;
          return `${UPLOAD_IMAGE}`  + items.image1;
         
        case 'Blue':
          // return 'http://localhost:42000/uploadimage/' + items.image2;
          return `${UPLOAD_IMAGE}`  + items.image2;
          
        case 'Red':
          // return 'http://localhost:42000/uploadimage/' + items.image3;
          return `${UPLOAD_IMAGE}`  + items.image3;
        
        case 'Black':
          // return 'http://localhost:42000/uploadimage/' + items.image4;
          return `${UPLOAD_IMAGE}`  + items.image4;
          
        default:
          // return 'http://localhost:42000/uploadimage/' + items.imageUrl;
          return `${UPLOAD_IMAGE}`  + items.imageUrl;
          
      }
    }
    removeFromCart(cartItem: dynamiccartitem) {
      this.dynamic.removeFromCart(cartItem.itm._id);
    }
  
    changeQuantity(cartItem: dynamiccartitem, quantityInString: string) {
      const quantity = parseInt(quantityInString);
      this.dynamic.changeQuantity(cartItem.itm._id, quantity);
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

    // 
}
