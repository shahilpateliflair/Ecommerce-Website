import { Component } from '@angular/core';
import { ProductsService } from 'src/app/shared/products.service';
import { product } from 'src/app/models/products';
import { profile } from 'src/app/models/profile';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  profiles: profile[] = [];
  authenticated = false;
  isAuth: boolean = false;
   useremail = '';
  name = '';
  productForm!: FormGroup;
  productId!: string;
  isFormDirty = false;
  originalProduct!: profile;
  profile: profile | undefined;
  constructor(){}
  urls = new Array<string>();

  onFileSelected(event:any) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          this.productForm.get('image')!.setValue(file); 
        }
        reader.readAsDataURL(file);
      }
    }
  }
  updateProfile(){}
}
