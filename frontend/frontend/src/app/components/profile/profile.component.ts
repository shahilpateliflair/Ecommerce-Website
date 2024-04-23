import { Component, OnInit } from '@angular/core';
import { user  } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';
import { IUserLogin } from 'src/app/interfaces/IUsersLogin';
import { IUserRegister } from 'src/app/interfaces/IUsersRegister';
import { ProfileService } from 'src/app/shared/profile.service';
import { profile } from 'src/app/models/profile';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  profiles: profile[] = [];
  authenticated = false;
  isAuth: boolean = false;
   useremail = '';
  name = '';
  productForm!: FormGroup;
  productId!: string;
  profile!: profile;
  originalProfileData: any;
  isFormDirty = false;
  originalProduct!: profile;
  constructor(private user:UserService, private toaster:ToastrService, private fb: FormBuilder, private profileService: ProfileService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.checkAuthentication();
    this.fetchUserProfile();
    this.productId = this.route.snapshot.paramMap.get('id')!;
  
    this.productForm = this.fb.group({
      name: [''], // Initialize with an empty string
    email: [''],
    address1: [''],
    address2: [''],
    state: [''],
    country: [''],
    mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      mobile1: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    postcode: [''],
    age: [''],

     
      image: ['',] 
  
    });
  
    this.productForm.valueChanges.subscribe(() => {
      this.isFormDirty = true;
    });
  }

  
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

  fetchUserProfile(): void {
    this.profileService.fetchProfile().subscribe(
      (profileData: any) => {
        const profile = profileData[0];
        this.productForm.patchValue(profile);
        this.productId = profile._id;
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
        this.toaster.error('Error fetching user profile');
      }
    );
  }
 
  addProduct() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.value.name);
      formData.append('email', this.productForm.value.email);
      formData.append('age', this.productForm.value.age);
      formData.append('mobile', this.productForm.value.mobile);
      formData.append('mobile1', this.productForm.value.mobile1);
      formData.append('address1', this.productForm.value.address1);
      formData.append('address2', this.productForm.value.address2);
      formData.append('state', this.productForm.value.state);
      formData.append('country', this.productForm.value.country);
      formData.append('postcode', this.productForm.value.postcode);
      
      formData.append('image', this.productForm.value.image);


    const token = localStorage.getItem('token');
    if (!token) {
      this.toaster.error("Token not found", "Error");
      return;
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

this.profileService.addProfile(formData, headers).subscribe(
  (response: any) => {
    console.log('Profile added successfully:', response);
    this.productForm.reset();
    this.toaster.success('Profile added successfully');
    
  },
  (error: any) => {
    console.error('Error adding profile:', error);
    this.toaster.error('Error adding profile');
  }
);
} else {
this.toaster.error('Please fill out all required fields correctly');
}
}

isProfileLoaded(): boolean {
  return !!this.productForm.get('name')?.value;
}

updateProfile() {
  if (this.productForm.valid) {
    const formData = new FormData();
    Object.keys(this.productForm.value).forEach(key => {
      formData.append(key, this.productForm.value[key]);
    });

    const token = localStorage.getItem('token');
    if (!token) {
      this.toaster.error('Token not found', 'Error');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.profileService.updateProfile(this.productId, formData, headers).subscribe(
      (response: any) => {
        console.log('Profile updated successfully:', response);
        // this.productForm.reset();
        this.toaster.success('Profile updated successfully');
      },
      (error: any) => {
        console.error('Error updating profile:', error);
        this.toaster.error('Error updating profile');
      }
    );
  } else {
    this.toaster.error('Please fill out all required fields correctly');
  }
}

checkAuthentication() {
    
  const token = localStorage.getItem('token');
  if (token) {
    this.isAuth = true; 
   
  } else {
    this.isAuth = false; 
  }
}

}

