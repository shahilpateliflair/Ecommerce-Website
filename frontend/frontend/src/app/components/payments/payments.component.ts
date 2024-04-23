import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Stripe } from '@stripe/stripe-js';
import { UserService } from 'src/app/shared/user.service';
import { cartitem } from 'src/app/models/cartitem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/shared/payment.service';
import { environment } from 'src/environments/environments';

import { dynamiccartitem } from 'src/app/models/dynamiccartitem';
import { DynamicService } from 'src/app/shared/dynamic.service';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  @ViewChild('cardElement') cardElement: ElementRef | undefined;

  checkoutForm!: FormGroup;
  isAuth: boolean = false;
 
  cartitem:dynamiccartitem[]=[]
 totalPrice: number = 0;
  totalQuantity!: number;
  cartitems!: number;
  constructor(private dynamic:DynamicService, private payment:PaymentService, private formBuilder:FormBuilder, private toaster:ToastrService,private http:HttpClient,private router:Router,private userService: UserService){
  
  }
 
  ngOnInit(): void {
    let { name,address ,email} = this.userService.currentUser;
   
    this.checkoutForm = this.formBuilder.group({
    name: [name, Validators.required],
      email: [email, Validators.required],
      address: [address, Validators.required]
    });
    this.fetchCartItems();
    this.totalPrice = this.dynamic.getTotalPrice();
    this.cartitem = this.dynamic.getCartItems();
  }


  async fetchCartItems() {
    try {
      this.totalPrice = this.dynamic.getTotalPrice();
      this.cartitem = await this.dynamic.getCartItems();
     
      this.totalQuantity = this.cartitem.reduce((total, item) => total + item.quantity, 0); 

      
      console.log('cart items' ,this.cartitem)
      
    
      let totalQuantity = 0;
      for (const item of this.cartitem) {
       
        totalQuantity += item.quantity;
      }
     
      console.log('Total price:', this.totalPrice);
      console.log('Total quantity:', totalQuantity);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    
    }
  }

  async redirectToCheckout() {
    try {
      const { email } = this.userService.currentUser;
      console.log('email',email)
     
      this.cartitem = await this.dynamic.getCartItems();
      this.totalPrice = await this.dynamic.getTotalPrice();
    
    let totalQuantity = this.cartitem.reduce((total, item) => total + item.quantity, 0); 
    
    console.log('Total Quantity:', totalQuantity);
      let model = {
      
        
        email: email,
        
        cartItems: this.cartitem,
        totalPrice:this.totalPrice ,
        totalQuantity: totalQuantity
      };
      console.log('email',email)
      console.log('Redirecting to checkout with model:', model);
  
      await this.payment.redirectToCheckout(model);
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
      this.toaster.error('Failed to redirect to checkout. Please try again later.');
    }
}
}
  