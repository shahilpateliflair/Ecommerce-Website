import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { PRODUCTS_URL } from './constants/urls';
import { product } from '../models/products';
import { catchError } from 'rxjs/operators';
import { PRODUCT_SERVICE_1 } from './constants/urls';
import { PRODUCT_SERVICE_2 } from './constants/urls';
import { PRODUCT_SERVICE_3 } from './constants/urls';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // private apiUrl = 'http://localhost:42000/add';
  // private baseUrl = 'http://localhost:42000/search';
  // private baseUrl1 = 'http://localhost:42000';
  private apiUrl = `${PRODUCT_SERVICE_1}`;
  private baseUrl = `${PRODUCT_SERVICE_2}`;
  private baseUrl1 = `${PRODUCT_SERVICE_3}`;

  constructor(private http: HttpClient) { }

  getProducts(category?: string): Observable<product[]> {
    let url = this.apiUrl;
    if (category) {
      url += `?category=${category}`;
    }
    return this.http.get<product[]>(this.apiUrl);
  }
  getProductById(id: string): Observable<product> {
    
    return this.http.get<product>(`${this.apiUrl}/${id}`);
  }
  addProduct(productData: FormData) {
    return this.http.post(this.apiUrl, productData);
  }
  updateProduct(productData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${productData._id}`, productData);
  }

  // Delete Product
  deleteProduct(productId: string): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<any>(url).pipe(
      catchError(error => {
        throw 'Error deleting product: ' + error;
      })
    );
  }
  getImageUrl(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      catchError(error => {
        throw 'Error getting image URL: ' + error;
      })
    );
  }

  searchProducts(searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/?name=${searchTerm}`);
  }

  getAllTagsByCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl1}tagsByCategories`);
  }
  calculatePrice(MRP: number, off: number): number {
    const discountAmount = (MRP * off) / 100;
    return MRP - discountAmount;
  }



postReview(reviewData: any): Observable<any> {
  return this.http.post(`${this.baseUrl1}product-reviews`, reviewData);
}
getProductById1(productId: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${productId}`).pipe(
    catchError(error => {
      throw 'Error fetching product details: ' + error;
    })
  );
}

}

