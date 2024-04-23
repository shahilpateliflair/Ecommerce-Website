import { HttpClient } from '@angular/common/http';
import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Action } from 'rxjs/internal/scheduler/Action';
import { orders } from 'src/app/models/orders';
import { productss } from 'src/app/models/productss';
import { ImageService } from 'src/app/services/image.service';
import { CartService } from 'src/app/shared/cart.service';
import { OrderService } from 'src/app/shared/order.service';
import { ProductsService } from 'src/app/shared/products.service';
import { PAYPAL } from 'src/app/shared/constants/urls';
// declare var paypal :any;
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})

export class PaypalComponent {
  productForm!: FormGroup;
  uploading: boolean = false;
  productId!: string;
  isFormDirty = false;
  originalProduct!: productss;
  // images: { [key: string]: File | null } = {};
  images: File[] = [];
  constructor(private fb: FormBuilder,private http:HttpClient, private productService: ProductsService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    
    this.productId = this.route.snapshot.paramMap.get('id')!;
  
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      MRP: ['', Validators.required],
      off: ['', Validators.required],
      tag: [''],
      origins: ['', Validators.required],
      deliverTime: ['', Validators.required],
    category: ['', Validators.required],
    
   
    
    });
    this.productForm.valueChanges.subscribe(() => {
      this.isFormDirty = true;
    });
  }

 
  onImageSelected(event: any): void {
    const files: FileList = event.target.files;
    const reader = new FileReader();
  
    reader.onload = (e: any) => {
      const imageDataUrl: string = e.target.result;
      this.originalProduct.image.push(imageDataUrl); // Push data URL into color array
    };
  
    for (let i = 0; i < files.length; i++) {
      reader.readAsDataURL(files[i]); // Convert each file to data URL
    }
    console.log(this.originalProduct.image)
  }


  addProduct() {
    const formData = new FormData();
    const formValue = this.productForm.value;
   // Check if all required fields are filled
  if (Object.values(formValue).some(value => !value)) {
    console.error('Please fill in all required fields.');
    return;
  }

  for (const key in formValue) {
    formData.append(key, formValue[key]);
  }
  for (let i = 0; i < this.images.length; i++) {
    formData.append(`image${i + 1}`, this.images[i]);
  }
  
  this.addProductToDatabase(formData);
}

addProductToDatabase(formData: FormData) {
    // this.http.post<any>('http://localhost:42000/productsAdd', formData).subscribe(
      this.http.post<any>(`${PAYPAL}productsAdd`, formData).subscribe(
      (response) => {
        console.log('Product added successfully:', response);
      
        this.productForm.reset();
        this.originalProduct = {_id:'', name: '', description: '', price: 0, image: [''] ,tag:'',origins:[''],deliverTime:[''],off:0,MRP:0};
        this.images = [];
      },
      (error) => {
        console.error('Failed to add product:', error);
      }
    );
  }
 }

   


 


