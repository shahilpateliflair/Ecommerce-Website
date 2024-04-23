import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/shared/order.service';
import { orders } from 'src/app/models/orders';
import { CartService } from 'src/app/shared/cart.service';
import { UserService } from 'src/app/shared/user.service';
import { HttpHeaders } from '@angular/common/http';
import { cartitem } from 'src/app/models/cartitem';
import { DynamicService } from 'src/app/shared/dynamic.service';
import { ProfileService } from 'src/app/shared/profile.service';
import { profile } from 'src/app/models/profile';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  totalPrice: number = 0;
  isAuth: boolean = false;
  productId!: string;
  profile!: profile;
  order: orders = new orders();
  checkoutForm!: FormGroup;
  //  cartitem!:cartitem

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  constructor(
    private profileService:ProfileService,
    private formBuilder: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private user: UserService,
    private cart: CartService,
    private toastr: ToastrService,
    private dynamic: DynamicService
  ) {}

  ngOnInit(): void {
    this.fetchUserProfile();
    let { name, address, email } = this.user.currentUser;

    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      email: [email, Validators.required],
      address: [address, Validators.required],
      alternativeAddress: [''],
      alternativeMobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      alternativeName: [''],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      // mobile1: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });

    const carts = this.dynamic.getCart();
    this.order.items = carts.items;

    this.order.totalPrice = carts.TotalPrice;
    this.checkAuthentication();
  }

  get fc() {

    return this.checkoutForm.controls;
  }

  
  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastr.warning('Please fill the details input', 'Invalid Details');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.error('Token not found', 'Error');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const carts = this.dynamic.getCart();

    // this.order.items = carts.items;

    items: carts.items.map((item) => ({
      itm: item.itm,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
      imageUrl: item.itm.imageUrl,
      name: item.itm.name,
    })),
 
      (this.order.totalPrice = carts.TotalPrice);

    const order: orders = {
      address: this.fc.address.value,
   
      name: this.fc.name.value,
      id: 0,
      color: this.order.color,
      size: this.order.size,
      paymentId: '',

      totalPrice: this.order.totalPrice,

      items: this.order.items,
      // items: [this.cartitem],
      createdAt: '',
      status: '',

      alteraddress: this.fc.alternativeAddress.value,
      altermobile: this.fc.alternativeMobile.value,
      altername: this.fc.alternativeName.value,
      mobile: this.fc.mobile.value,
      selectedSize: '',
      selectedColor: '',
    };

    // this is not changed from here not changed
    this.order.address = this.fc.address.value;
    this.order.name = this.fc.name.value;
    this.orderService.createOrder(order, headers).subscribe(
      () => {
        console.log(carts);
        this.order.address = this.fc.address.value;
        this.order.name = this.fc.name.value;
       
        // this.toastr.success('Order created successfully');
        this.router.navigateByUrl('/payments');
      },
      (error: any) => {
        this.toastr.error('Error creating order');
        console.error('Error creating order:', error);
      }
    );
    console.log(this.fc.name);
    console.log(this.fc.address);
  }
  fetchUserProfile(): void {
    this.profileService.fetchProfile().subscribe(
      (profileData: any) => {
        const profile = profileData[0];
        this.checkoutForm.patchValue(profile);
        this.productId = profile._id;
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
        this.toastr.error('Error fetching user profile');
      }
    );
  }
 
  checkAuthentication() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuth = true; 
      const { name, address } = this.user.currentUser;
      this.checkoutForm.patchValue({
        name,
        address,
      });
    } else {
      this.isAuth = false; 
    }
  }
}
