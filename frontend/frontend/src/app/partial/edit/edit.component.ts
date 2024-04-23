import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/shared/products.service';
import { product } from 'src/app/models/products';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  productForm!: FormGroup;
  productId!: string;
  isFormDirty = false;
  originalProduct!: product;
  constructor(private fb: FormBuilder, private productService: ProductsService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.loadProduct();
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      MRP: ['', Validators.required],
      off: ['', Validators.required],
      origins: ['', Validators.required],
      deliverTime: ['', Validators.required],
      tag: ['',],
      // image: [null, Validators.required]
      image: [''] 
      // No need to include ID field here
    });
    this.productForm.valueChanges.subscribe(() => {
      this.isFormDirty = true;
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.get('image')!.setValue(file); // Set value of image control
    }
  }
  loadProduct() {
    this.productService.getProductById(this.productId).subscribe(
      (product: product) => {
        this.originalProduct = product;
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          MRP: product.MRP,
          tag: product.tag,
          off: product.off,
          origins: product.origins,
          deliverTime: product.deliverTime,
          // image: product.imageUrl // You may choose not to display the image for editing
        });
      },
      (      error: any) => {
        console.error('Error loading product:', error);
      }
    );
  }
 
  updateProduct() {
    if (this.productForm.valid && this.isFormDirty) { // Check if form is valid and has been modified
      const updatedProductData = this.productForm.value;
      updatedProductData._id = this.productId; // Include product ID
      this.productService.updateProduct(updatedProductData).subscribe(
        (response: any) => {
          console.log('Product updated successfully:', response);
          // Optionally, reset form or show success message
          this.isFormDirty = false; // Reset dirty flag
        },
        (error: any) => {
          console.error('Error updating product:', error);
        }
      );
    }
  }
  addProduct() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.value.name);
      formData.append('description', this.productForm.value.description);
      formData.append('price', this.productForm.value.price);
      formData.append('MRP', this.productForm.value.MRP);
      formData.append('off', this.productForm.value.off);
      formData.append('tag', this.productForm.value.tag);
      formData.append('origins', this.productForm.value.origins);
      formData.append('deliverTime', this.productForm.value.deliverTime);
      // Append image data if you're also uploading images
      formData.append('image', this.productForm.value.image);
      this.productService.addProduct(formData).subscribe(
        (response: any) => {
          console.log('Product added successfully:', response);
          this.productForm.reset();
          // Handle success response if needed
        },
        (error: any) => {
          console.error('Error adding product:', error);
          // Handle error response if needed
        }
      );
    }
    
 

 
}}
