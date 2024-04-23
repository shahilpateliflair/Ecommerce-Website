import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Review } from '../models/productreview';
import { PRODUCT_SERVICE } from '../shared/constants/urls';
import { ADD } from '../shared/constants/urls';
@Injectable({
  providedIn: 'root'
})
export class ProductreviewService {
  // private apiUrl = 'http://localhost:42000';
  private apiUrl = `${ADD}`;

  private apiUrl1 = 'http://localhost:42000/product-reviews/';
private base =`${PRODUCT_SERVICE}`

  constructor(private http: HttpClient) { }

 

  submitReview(review: Review,headers: any) {
    // return this.http.post('http://localhost:42000/product-reviews', review,{ headers });
    return this.http.post(`${this.base}`, review,{ headers });
  }

  getReviewsForProduct(productId: string): Observable<Review[]> {
    const url = `${this.apiUrl}product/${productId}/reviews`;
    return this.http.get<Review[]>(url);
  }

  getProductById(id: string): Observable<Review> {
    
    return this.http.get<Review>(`${this.apiUrl}product/${id}/reviews`);
  }
  
}
