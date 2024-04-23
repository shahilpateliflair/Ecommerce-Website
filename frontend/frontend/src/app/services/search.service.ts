import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { product } from '../models/products';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchResultsSubject = new BehaviorSubject<product[]>([]);
  searchResults$: Observable<product[]> = this.searchResultsSubject.asObservable();

  constructor(private http: HttpClient) { }

  searchProducts(name: string): void {
    if (!name.trim()) {
      return;
    }
    this.http.get<product[]>(`https://e-commerce-l2js3q893-shahil-patels-projects.vercel.app/search?name=${name}`).subscribe(
      (products: product[]) => {
        this.searchResultsSubject.next(products);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
