import { Component, Input, OnInit } from '@angular/core';
import { dynamiccart } from 'src/app/models/dynamiccart';
import { orders } from 'src/app/models/orders';
import { DynamicService } from 'src/app/shared/dynamic.service';
import { product } from 'src/app/models/products';
import { UPLOAD_IMAGE } from 'src/app/shared/constants/urls';
@Component({
  selector: 'app-order-item-list',
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.css']
})
export class OrderItemListComponent implements OnInit{

@Input()
order!:orders;

product!:dynamiccart;
  products!:any;
  
    cart!: dynamiccart;
    
   
    items!: any[];

constructor(private dynamic: DynamicService) {}

ngOnInit(): void {
  const cartFromLocalStorage = this.dynamic.getCartFromLocalStorage();
  if (cartFromLocalStorage) {
    this.cart = cartFromLocalStorage;
  } else {
    // If cart data does not exist in local storage, initialize it from service
    this.dynamic.getCartObservable().subscribe((dynamiccart: dynamiccart) => {
      this.cart = dynamiccart;
    });
  }
  this.items = this.cart ? this.cart.items : []; // Ensure items are initialized
}

getImageUrlByColor(color: string, items: any): string {
  switch (color) {
    case 'White':
      // return 'http://localhost:42000/uploadimage/' + items.imageUrl;
      return `${UPLOAD_IMAGE}`+ items.imageUrl;
    case 'Gray':
      return `${UPLOAD_IMAGE}` + items.image1;
    case 'Blue':
      return `${UPLOAD_IMAGE}` + items.image2;
    case 'Red':
      return `${UPLOAD_IMAGE}` + items.image3;
    case 'Black':
      return `${UPLOAD_IMAGE}` + items.image4;
    default:
      return `${UPLOAD_IMAGE}` + items.imageUrl;
  }
}

getProductImageUrl(product: product): string {
  // Assuming imageUrl is a property of your Product model
  // return `https://e-commerce-l2js3q893-shahil-patels-projects.vercel.app/${product.imageUrl}`;
  return `${UPLOAD_IMAGE}${product.imageUrl}`;
}
getTotalQuantity(): number {
  return this.order.items.reduce((total, item) => total + item.quantity, 0);
}
getTotalPrice(): number {
  return this.order.items.reduce((total, item) => total + (item.quantity * item.price), 0);
}

}



// constructor(private dynamic:DynamicService){
//   // this.dynamic.getCartObservable().subscribe((dynamiccart) => {
//   //   this.cart = dynamiccart;
//   // });
// }

//   ngOnInit(): void {
//     this.dynamic.getCartObservable().subscribe((dynamiccart:dynamiccart) => {
//       this.cart = dynamiccart;
//       this.items = this.cart.items; // Update the items list
//      } )
// }