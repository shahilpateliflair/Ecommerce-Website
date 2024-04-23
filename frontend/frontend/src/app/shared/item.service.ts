import { Injectable } from '@angular/core';
import { item } from '../models/item';
import { sample_products, sample_tags } from 'src/data';
import { tags } from '../models/tags';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITEMS_BY_ID, ITEMS_BY_SEARCH_URL, ITEMS_URL, MENS_TAGS_URL, MENS_URL, MEN_ITEMS_BY_ID, MEN_ITEMS_BY_SEARCH_URL, MEN_TAGS_BY_TAGNAME, TAGS_BY_TAGNAME, TAGS_URL } from './constants/urls';
import { men } from '../models/men';
import { product } from '../models/products';
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = 'http://localhost:4200/add'; 
  // private baseUrl = 'https://e-commerce-l2js3q893-shahil-patels-projects.vercel.app/add'; 
  constructor(private http:HttpClient) { }

  // for get all products
  getAll(): Observable<item[]>{
      return this.http.get<item[]>(ITEMS_URL);
  }
  getAllMens(): Observable<men[]>{
    return this.http.get<men[]>(MENS_URL);
}

  // for search
  getAllItemBySearchTerms(searchTerm:string):Observable<item[]>{
 return this.http.get<item[]>(ITEMS_BY_SEARCH_URL + searchTerm)
  }

  getAllMenItemBySearchTerms(searchTerm:string):Observable<men[]>{
    return this.http.get<men[]>(MEN_ITEMS_BY_SEARCH_URL + searchTerm)
     }

  // for product description by id
  getItemById(itemId:string):Observable<item>{
 return this.http.get<item>(ITEMS_BY_ID + itemId)
  }

  getMenItemById(itemId:string):Observable<any>{
    return this.http.get<any>(MEN_ITEMS_BY_ID + itemId)
     }


     getProductById(id: string): Observable<product> {
      return this.http.get<product>(`${this.baseUrl}/${id}`);
    }
   
  // by tag methods

  getAllTags():Observable<tags[]>{
    return this.http.get<tags[]>(TAGS_URL)
  }

  getAllMenTags():Observable<men[]>{
    return this.http.get<men[]>(MENS_TAGS_URL)
  }

  // item by tagsname
  getAllItemByTag(tag:string):Observable<item[]>{
  return tag ==='All'?
this.getAll():

this.http.get<item[]>( TAGS_BY_TAGNAME  + tag)
  }

  getAllMenItemByTag(tag:string):Observable<men[]>{
    return tag ==='All'?
  this.getAllMens():
  
  this.http.get<men[]>( MEN_TAGS_BY_TAGNAME  + tag)
    }
  


}
