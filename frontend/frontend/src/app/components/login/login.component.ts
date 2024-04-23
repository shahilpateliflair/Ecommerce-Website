import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit{

  loginForm!:FormGroup;
isSubmitted =false;
  returnUrl: any;
  toastr: any;
  showPassword = false;

  constructor(
    private user:UserService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private http: HttpClient,
    private toaster:ToastrService
  ) { }

  ngOnInit(): void {
 this.loginForm=this.formBuilder.group({
 email:['',[Validators.required,Validators.email]],
 password:['',Validators.required]
 });

 this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  get fc(){
  return this.loginForm.controls;
  }

submit() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    this.toaster.error('Not Valid')
    return;
  }
  this.user.login({ email: this.fc.email.value, password: this.fc.password.value }).subscribe(
    (userData) => {
      console.log('Token:', userData.token);
      localStorage.setItem('token', userData.token);
      if (this.fc.email.value === 'shahilpatel688@gmail.com') {
        this.router.navigateByUrl('/admin-dashboard');
      } else {
       
        this.router.navigateByUrl(this.returnUrl);
      }
    },
 
    (error) => {
      console.error('Login error:', error);
      this.toastr.error('Login failed. Please check your credentials.', 'Error');
    }
  );
}
}

