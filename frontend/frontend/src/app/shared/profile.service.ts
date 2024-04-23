import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { profile } from '../models/profile';
import { PRODUCT_SERVICE_3 } from './constants/urls';
import { PROFILE_SERVICE } from './constants/urls';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  private apiUrl = `${PRODUCT_SERVICE_3}`;
  private baseUrl = `${PRODUCT_SERVICE_3}`;
  private baseUrl1 = `${PRODUCT_SERVICE_3}`;
private base1= `${PROFILE_SERVICE}`;
  // private apiUrl = 'http://localhost:42000';
  // private baseUrl = 'http://localhost:42000';
  // private baseUrl1 = 'http://localhost:42000';


 
  constructor(private http: HttpClient) { }


  getProfileById(id: string): Observable<profile> {
    return this.http.get<profile>(`${this.baseUrl}profile/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

 
  getAllProfiles(): Observable<profile[]> {
    return this.http.get<profile[]>(`${this.baseUrl}profile`)
      .pipe(
        catchError(this.handleError)
      );
  }
  getCurrentUserProfile(token: string): Observable<profile[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
   
    return this.http.get<profile[]>(`${this.base1}`,{headers});
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }

  
  addProfile(productData: FormData, headers: any) {
    return this.http.post(`${this.base1}`, productData,{ headers });
  }

  
  getProfiles(token: string): Observable<profile[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<profile[]>(`${this.base1}`, { headers });
  }

  getUserProfile(profileId: string): Observable<profile> {
    const url = `${this.apiUrl}profile/${profileId}`;
    return this.http.get<profile>(url).pipe(
      catchError((error: any) => {
        console.error('Error fetching user profile:', error);
        return throwError('Failed to fetch user profile'); // Customize the error message as needed
      })
    );
  }
  
  getProductById1(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}profile/${productId}`).pipe(
      catchError(error => {
        throw 'Error fetching product details: ' + error;
      })
    );
  }
  saveProfile(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError('Token not found');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.baseUrl}profile`, formData, { headers }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  fetchProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError('Token not found');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseUrl}profile`, { headers }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  
 
  updateProfile(profileId: string, profileData: FormData, headers: HttpHeaders): Observable<any> {
    const url = `${this.apiUrl}profile/${profileId}`;
    return this.http.put(url, profileData, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }
 

}
