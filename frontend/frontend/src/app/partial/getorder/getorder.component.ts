import { Component, OnInit } from '@angular/core';
import { Order } from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { orders } from 'src/app/models/orders';
import { user } from 'src/app/models/user';
import { OrderService } from 'src/app/shared/order.service';
import { ProductsService } from 'src/app/shared/products.service';
import { UserService } from 'src/app/shared/user.service';
import { product } from 'src/app/models/products';
import { Router } from '@angular/router';
import { UPLOAD_IMAGE } from 'src/app/shared/constants/urls';
@Component({
  selector: 'app-getorder',
  templateUrl: './getorder.component.html',
  styleUrls: ['./getorder.component.css']
})
export class GetorderComponent implements OnInit{
  users!: user;
  items:any
  products!: any;
  message = '';
  ordersss!: Order;
  orders: orders[] = [];
  isAuth: boolean = false;
  productId!:''
 orderss: any;
  constructor(private user:UserService,private router:Router ,private order:OrderService,private toaster:ToastrService,private product:ProductsService){
    user.userObservable.subscribe((newUser) => {
      this.users = newUser;
    });
  }
  ngOnInit(): void {
    this.checkAuthentication();
    

  }
 
  getImageUrlByColor(color: string, items: any): string {
    switch (color) {
      case 'White':
        return 'http://localhost:42000/uploadimage/' + items.imageUrl;
      case 'Gray':
        return 'http://localhost:42000/uploadimage/' + items.image1;
      case 'Blue':
        return 'http://localhost:42000/uploadimage/' + items.image2;
      case 'Red':
        return 'http://localhost:42000/uploadimage/' + items.image3;
      case 'Black':
        return 'http://localhost:42000/uploadimage/' + items.image4;
      default:
        return 'http://localhost:42000/uploadimage/' + items.imageUrl;
    }
  }
  checkAuthentication() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuth = true;
     
      this.fetchOrders(token);
      
    } else {
      this.isAuth = false;
      
    }
  }

  fetchOrders(token: string) {
    this.order.getOrdersForUser(token).subscribe(
      (orders: orders[]) => {
        this.orders = orders;
        console.log('Orders:', this.orders);
        this.fetchProductDetailsForOrders();
      },
      (error: any) => {
        console.error('Error fetching orders:', error);
        this.toaster.error('Error fetching orders');
       
      }
    );

  }
  
  fetchProductDetailsForOrders(): void {
    this.orders.forEach(order => {
      order.items.forEach(item => {
        console.log('Item:', item);
       
        if (item.itm) {
          let productId: string;
          if (typeof item.itm === 'string') {
           
            productId = item.itm;
          } else if (typeof item.itm === 'object' && '_id' in item.itm) {
           
            productId = item.itm._id;
          } else {
            console.error('Invalid item ID:', item.itm);
            return; 
          }
        
          this.getProductDetails(productId, item);
          console.log('Item ID:', productId);
        } else {
          console.error('Invalid item ID:', item);
        }
      });
    })
  }
  
  getProductDetails(productId: string, item: any): void {
    this.product.getProductById1(productId).subscribe(
      (productData: product) => {
     
        if (productData && typeof productData === 'object') {
         
          console.log('Product details:', productData);
       
          item.product = productData;
        } else {
          console.error('Invalid product data received:', productData);
        }
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  getProductImageUrl(product: product): string {
    return `${UPLOAD_IMAGE}${product.imageUrl}`;
    // return `http://localhost:42000/${product.imageUrl}`;
  }
}
