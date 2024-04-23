import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/models/products';
import { ProductsService } from 'src/app/shared/products.service';
import { UPLOAD_PRODUCT } from 'src/app/shared/constants/urls';
import { UPLOAD_IMAGE } from 'src/app/shared/constants/urls';
import { MEN_CATEGORY } from 'src/app/shared/constants/urls';
import { WOMEN_CATEGORY } from 'src/app/shared/constants/urls';
import { ELECTRONICS_CATEGORY } from 'src/app/shared/constants/urls';
@Component({
  selector: 'app-dynamicproduct',
  templateUrl: './dynamicproduct.component.html',
  styleUrls: ['./dynamicproduct.component.css']
})
export class DynamicproductComponent implements OnInit{
  category: string = '';
  calculatedPrice!: number;
  mensProducts: product[] = [];
  womensProducts: product[] = [];
  electronicsProducts: product[] = [];
products:product[]=[];
activeProductId: string | null = null;
// _id!: string;
filteredItems: product[] = [];
items: product[] = [];
searchTerm: string = '';

productId!: string;
  constructor(private route: ActivatedRoute, private http: HttpClient,private productService: ProductsService,private router:Router,private activatedRoute: ActivatedRoute){
   
  }

  ngOnInit(): void {
    
    this.loadProducts();
    this.route.params.subscribe(params => {
      this.productId = params['id'];
     
    });

    this.http.get<product[]>(ELECTRONICS_CATEGORY).subscribe(data => {
   
      this.electronicsProducts = data;
    });
  
    
    this.http.get<product[]>(MEN_CATEGORY).subscribe(data => {  
    
    this.mensProducts = data;
    });
  
    
      // this.http.get<product[]>('http://localhost:42000/women').subscribe(data => { 
        this.http.get<product[]>(WOMEN_CATEGORY).subscribe(data => { 
    this.womensProducts = data;
    });
  }
  
  loadProducts() {
    this.productService.getProducts(this.category).subscribe(
      (products: product[]) => {
        this.products = products;
        this.mensProducts = this.products.filter(
          (product) => product.category === 'men'
        );
        this.womensProducts = this.products.filter(
          (product) => product.category === 'women'
        );
        this.electronicsProducts = this.products.filter(
          (product) => product.category === 'electronics'
        );
        console.log('Products:', this.products); // Log products array
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
    this.filterItems(); 
  }

  filterItems(): void {
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  showProductDetails(productId: string): void {
    this.activeProductId = productId;
  }
 
  getProductImageUrl(product: product): string {
    return `${UPLOAD_IMAGE}${product.imageUrl}`;
    // return `http://localhost:42000/${product.imageUrl}`;
  }

}


