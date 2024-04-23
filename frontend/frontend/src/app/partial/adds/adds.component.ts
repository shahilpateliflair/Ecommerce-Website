import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/shared/products.service';
import { product } from 'src/app/models/products';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ADD } from 'src/app/shared/constants/urls';
@Component({
  selector: 'app-adds',
  templateUrl: './adds.component.html',
  styleUrls: ['./adds.component.css']
})
export class AddsComponent {
  productForm!: FormGroup;
  uploading: boolean = false;
  productId!: string;
  isFormDirty = false;
  originalProduct!: product;
  images: { [key: string]: File | null } = {};
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

  onFileSelected(event: any, fieldName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images[fieldName] = file;
    }
  }
  

  addProduct() {
    const formData = new FormData();
    const formValue = this.productForm.value;
    formData.append('name', formValue.name);
    formData.append('description', formValue.description);
    formData.append('category', formValue.category);
    formData.append('price', formValue.price);
    formData.append('MRP', formValue.MRP);
    formData.append('off', formValue.off);
    formData.append('tag', formValue.tag);
    formData.append('origins', formValue.origins);
    formData.append('deliverTime', formValue.deliverTime);
    formData.append('imageUrl', this.images['imageUrl'] as Blob);
    formData.append('image1', this.images['image1'] as Blob);
    formData.append('image2', this.images['image2'] as Blob);
    formData.append('image3', this.images['image3'] as Blob);
    formData.append('image4', this.images['image4'] as Blob);

    // this.http.post<any>('http://localhost:42000/add', formData).subscribe(
      this.http.post<any>(`${ADD}add`, formData).subscribe(
      (response) => {
        console.log('Product added successfully:', response);
      
        this.productForm.reset();
        Object.keys(this.images).forEach(key => {
          this.images[key] = null;
        });
      },
      (error) => {
        console.error('Failed to add product:', error);
      }
    );
  }
  
    
}

