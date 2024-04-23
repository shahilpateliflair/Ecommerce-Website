import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../models/new';
import { UPLOAD_PRODUCT } from '../shared/constants/urls';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

private apiUrl = `${UPLOAD_PRODUCT}`;
  constructor(private http: HttpClient) { }

 
  uploadImages(images: { file: File, name: string }[]): Observable<Image[]> {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image.file);
      formData.append('names', image.name);
    });
    // return this.http.post<Image[]>('http://localhost:42000/upload', formData);
    return this.http.post<Image[]>(`${this.apiUrl}`, formData);
  }
}

