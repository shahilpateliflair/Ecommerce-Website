// app.put('/profile/:id', authenticate, async (req: AuthenticatedRequest, res: Response) => {
//     try {
//       // Extract profile ID from request parameters
      
  
     
  
//       // Extract fields from the request body
//       const { name, mobile1, email, address1, address2, country, state, postcode, mobile, age } = req.body;
  
//       // Check if the profile belongs to the authenticated user
//       const profile = await Profile.findOne({  user: req.user.userId });
  
//       // If profile not found or doesn't belong to the user, return error
//       if (!profile) {
//         return res.status(404).json({ error: 'Profile not found' });
//       }
  
//       // Update profile fields
//       profile.name = name || profile.name;
//       profile.email = email || profile.email;
//       profile.address1 = address1 || profile.address1;
//       profile.address2 = address2 || profile.address2;
//       profile.age = age || profile.age;
//       profile.postcode = postcode || profile.postcode;
//       profile.mobile1 = mobile1 || profile.mobile1;
//       profile.mobile = mobile || profile.mobile;
//       profile.imageUrl = req.file ? req.file.path : profile.imageUrl;
//       profile.state = state || profile.state;
//       profile.country = country || profile.country;
  
//       // Save the updated profile to the database
//       await profile.save();
  
//       // Respond with success message and the updated profile
//       res.status(200).json({ message: 'Profile updated successfully', profile });
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
//   import { Component, OnInit } from '@angular/core';
//   import { user  } from 'src/app/models/user';
//   import { UserService } from 'src/app/shared/user.service';
//   import { IUserLogin } from 'src/app/interfaces/IUsersLogin';
//   import { IUserRegister } from 'src/app/interfaces/IUsersRegister';
//   import { ProfileService } from 'src/app/shared/profile.service';
//   import { profile } from 'src/app/models/profile';
//   import { ReactiveFormsModule } from '@angular/forms';
//   import { FormBuilder,FormGroup } from '@angular/forms';
//   import { Validators } from '@angular/forms';
//   import { ActivatedRoute } from '@angular/router';
//   import { HttpHeaders } from '@angular/common/http';
//   import { ToastrService } from 'ngx-toastr';
  
//   @Component({
//     selector: 'app-profile',
//     templateUrl: './profile.component.html',
//     styleUrls: ['./profile.component.css']
//   })
//   export class ProfileComponent implements OnInit{
//     profiles: profile[] = [];
//     authenticated = false;
//     isAuth: boolean = false;
//      useremail = '';
//     name = '';
//     productForm!: FormGroup;
//     productId!: string;
//     isFormDirty = false;
//     originalProduct!: profile;
//     profile: profile | undefined;
//     profileForm!: FormGroup;
//     profileId!: string;
//     constructor(private user:UserService, private toaster:ToastrService, private fb: FormBuilder, private profileService: ProfileService, private route: ActivatedRoute,) { }
  
//     ngOnInit(): void {
//       this.checkAuthentication();
//       this.fetchUserProfile();
//       this.initForm();
//     //  this.addProduct()
//       this.productId = this.route.snapshot.paramMap.get('id')!;
//       const profileId = this.route.snapshot.paramMap.get('id');
  
//       const token = localStorage.getItem('token');
//       if (!token) {
//         this.toaster.error('Token not found', 'Error');
//         return;
//       }
//       this.profileService.getProfiles(token).subscribe(
//         (response: any) => {
//           this.profile = response.profile;
//           // this.populateFormWithProfileDetails();
//         },
//         (error: any) => {
//           console.error('Error fetching profile:', error);
//         }
//       );
    
    
//       this.productForm.valueChanges.subscribe(() => {
//         this.isFormDirty = true;
//       });
//     }
//   initForm(){
  
//     this.productForm = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', Validators.required],
//       address1: ['', Validators.required],
//       address2: ['', Validators.required],
//       state: ['', Validators.required],
//       country: [''],
//       mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
//       mobile1: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
//      postcode: ['', Validators.required],
//   age: ['', Validators.required],
     
//       image: ['',Validators.required] 
  
//     });
//   }
   
//     urls = new Array<string>();
//     onFileSelected(event:any) {
//       this.urls = [];
//       let files = event.target.files;
//       if (files) {
//         for (let file of files) {
//           let reader = new FileReader();
//           reader.onload = (e: any) => {
//             this.urls.push(e.target.result);
//             this.productForm.get('image')!.setValue(file); 
//           }
//           reader.readAsDataURL(file);
//         }
//       }
//     }
//     fetchUserProfile() {
//       const token = localStorage.getItem('token');
//       if (token) {
//         this.profileService.getCurrentUserProfile(token).subscribe(
//           (response: any) => {
//             // Assuming response contains user profile data
//             this.profile = response; // Assuming response is the profile object
//             this.populateFormWithProfileDetails(this.profile);
//           },
//           (error: any) => {
//             console.error('Error fetching user profile:', error);
//           }
//         );
//       }
//     }
      
        
//   populateFormWithProfileDetails(profileData: any): void {
//     console.log('Populating form with profile data:', profileData);
//     if (profileData) {
//       this.productForm.patchValue({
//         name: profileData.name || '',
//         email: profileData.email || '',
//         address1: profileData.address1 || '',
//         address2: profileData.address2 || '',
//         state: profileData.state || '',
//         country: profileData.country || '',
//         mobile: profileData.mobile || '',
//         mobile1: profileData.mobile1 || '',
//         postcode: profileData.postcode || '',
//         age: profileData.age || ''
//       });
//     } else {
//       console.error('No profile data found.');
//     }
//     console.log('Form after patching values:', this.productForm.value);
//   }
      
//     updateProfile() {
//       if (this.profileForm.valid) {
//         const formData = new FormData();
//         formData.append('name', this.profileForm.value.name);
//         formData.append('email', this.profileForm.value.email);
//         // Add other form fields to the formData as needed
  
//         const token = localStorage.getItem('token');
//         if (!token) {
//           this.toaster.error('Token not found', 'Error');
//           return;
//         }
  
//         const headers = new HttpHeaders({
//           Authorization: `Bearer ${token}`
//         });
  
//         // Call the service method to update the profile
//         this.profileService.updateProfile(formData, headers).subscribe(
//           (response: any) => {
//             console.log('Profile updated successfully:', response);
//             this.toaster.success('Profile updated successfully');
           
//           },
//           (error: any) => {
//             console.error('Error updating profile:', error);
//             this.toaster.error('Error updating profile');
//           }
//         );
//       } else {
//         this.toaster.error('Please fill out all required fields correctly');
//       }
//     }
//     addProduct() {
//       if (this.productForm.valid) {
//         const formData = new FormData();
//         formData.append('name', this.productForm.value.name);
//         formData.append('email', this.productForm.value.email);
//         formData.append('age', this.productForm.value.age);
//         formData.append('mobile', this.productForm.value.mobile);
//         formData.append('mobile1', this.productForm.value.mobile1);
//         formData.append('address1', this.productForm.value.address1);
//         formData.append('address2', this.productForm.value.address2);
//         formData.append('state', this.productForm.value.state);
//         formData.append('country', this.productForm.value.country);
//         formData.append('postcode', this.productForm.value.postcode);
//         // Append image data if you're also uploading images
//         formData.append('image', this.productForm.value.image);
  
  
//       const token = localStorage.getItem('token');
//       if (!token) {
//         this.toaster.error("Token not found", "Error");
//         return;
//       }
    
//       const headers = new HttpHeaders({
//         'Authorization': `Bearer ${token}`
//       });
  
  
//   this.profileService.updateProfile(formData, headers).subscribe(
//     (response: any) => {
//       console.log('Profile added successfully:', response);
//       this.productForm.reset();
//       this.toaster.success('Profile added successfully');
//       // Optionally, navigate to another page or perform any additional actions after successful submission
//     },
//     (error: any) => {
//       console.error('Error adding profile:', error);
//       this.toaster.error('Error adding profile');
//     }
//   );
//   } else {
//   this.toaster.error('Please fill out all required fields correctly');
//   }
//   }
  
  
//   checkAuthentication() {
      
//     const token = localStorage.getItem('token');
//     if (token) {
//       this.isAuth = true; 
     
//     } else {
//       this.isAuth = false; 
//     }
//   }
  
//   }
  
  
//    // onFileSelected(event: any) {
//     //   if (event.target.files.length > 0) {
//     //     const file = event.target.files[0];
//     //     this.productForm.get('image')!.setValue(file); // Set value of image control
//     //   }
//     // }
  