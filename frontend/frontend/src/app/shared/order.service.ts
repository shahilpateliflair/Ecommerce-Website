import { Injectable } from '@angular/core';
import { orders } from '../models/orders';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ORDER_CREATE_URL  } from './constants/urls';
import { Observable, catchError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { dynamiccart } from '../models/dynamiccart';
import { dynamiccartitem } from '../models/dynamiccartitem';
import { ORDER_CREATE_URL1 } from './constants/urls';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  [x: string]: any;

  constructor(private http:HttpClient) { }



createOrder(order: orders, headers: any) {
  return this.http.post<orders>(ORDER_CREATE_URL, order, { headers });
}

// 
getOrders(): Observable<any[]> {
  // return this.http.get<any[]>('http://localhost:42000/create');
  return this.http.get<any[]>(ORDER_CREATE_URL);
 
}


getOrdersForUser(token: string): Observable<orders[]> {
 
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<orders[]>(ORDER_CREATE_URL1, { headers });
  // return this.http.get<orders[]>('http://localhost:42000/orders', { headers });
}

}




