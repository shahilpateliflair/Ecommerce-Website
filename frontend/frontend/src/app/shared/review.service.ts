import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REVIEW_URL, REVIEW_URLS } from './constants/urls';
import { review } from '../interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  
  constructor( private http:HttpClient) {}
  
  submitReview(reviewData: review,headers: any): Observable<any> {
    return this.http.post<review>(REVIEW_URL, reviewData, { headers });
  }

  

  getReview():Observable<review[]>{
    return this.http.get<review[]>(REVIEW_URL)
    // return this.http.get<review[]>('http://localhost:42000/review')
  }
 
}
 