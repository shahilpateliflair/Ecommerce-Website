import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder ,FormGroup, Validators,ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IUserRegister } from 'src/app/interfaces/IUsersRegister';
import { UserService } from 'src/app/shared/user.service';
import { PasswordMatchValidators } from 'src/app/interfaces/password_match';
import { user } from 'src/app/models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  showOTPInput: boolean = false;
  otp: string = '';
  otpVerified: boolean = false;

  registerForm!:FormGroup;
  isSubmitted = false;
 
  returnUrl = '';
  activatedroute: any;
  showPassword = false;
  showConfirmPassword = false;
  
  users:user[]=[]

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    activatedroute:ActivatedRoute,
    private user:UserService,
    
  ) {}

  

  ngOnInit(): void {
    this.registerForm=this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(5)]],
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required,Validators.minLength(8),this.passwordStrengthValidator()],
    confirmPassword:['',Validators.required],
    address:['',Validators.required,Validators.minLength(10)]},
   
   {
    // Validators: PasswordMatchValidators('password','confirmPassword')
    validators: this.passwordMatchValidator
   } );
   
    this.returnUrl = this.activatedroute.snapshot.queryParams.returnUrl;

  
     }

     
     passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
  
      return password && confirmPassword && password.value !== confirmPassword.value
        ? { passwordMismatch: true }
        : null;
    }
    
    passwordStrengthValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
        if (!regex.test(value)) {
          let errorMessage = 'Please enter a password that contains at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.';
          if (!/(?=.*\d)/.test(value)) {
            errorMessage = 'Password must contain at least one number.';
          } else if (!/(?=.*\W)/.test(value)) {
            errorMessage = 'Password must contain at least one special character.';
          }
          Swal.fire('Error', errorMessage, 'error');
          return { passwordWeak: true };
        }
        return null;
      };
    }
    togglePasswordVisibility(): void {
      this.showPassword = !this.showPassword;
    }


     get fc(){
     return this.registerForm.controls;
     }
   
     
  register(){
this.isSubmitted=true;
// if(this.registerForm.invalid) return;


if (this.registerForm.invalid) {
  
 
  if (this.registerForm.invalid) {
    if ( this.fc.name.errors?.required) {
      Swal.fire('Error', 'Name is required.', 'error');
    }
    if (this.fc.password !== this.fc.confirmPassword) {
      Swal.fire('Error', 'confirm password not match', 'error');
    }
    if (this.fc.email.invalid && this.fc.email.errors?.required) {
      Swal.fire('Error', 'Email is required.', 'error');
    }
     if (this.fc.password.errors?.minlength) {
      Swal.fire('Error', 'Password must be at least 8 characters long.', 'error');
    }
    if (this.fc.name.errors?.minlength) {
      Swal.fire('Error', 'Name must be at least 8 characters long.', 'error');
    }
    if (this.fc.email.invalid && this.fc.email.errors?.email) {
      Swal.fire('Error', 'Invalid email format.', 'error');
    }
    if (this.fc.password.invalid && this.fc.password.errors?.required) {
      Swal.fire('Error', 'Password is required.', 'error');
    }
    if (this.fc.password.invalid && this.fc.password.errors?.minlength) {
      Swal.fire('Error', 'Password must be at least 8 characters long.', 'error');
    }
    if (this.fc.confirmPassword.invalid && this.fc.confirmPassword.errors?.required) {
      Swal.fire('Error', 'Confirm Password is required.', 'error');
    }
    if (this.fc.confirmPassword.invalid && this.fc.confirmPassword.errors?.passwordMismatch) {
      Swal.fire('Error', 'Passwords do not match.', 'error');
    }
    if (this.fc.address.invalid && this.fc.address.errors?.required) {
      Swal.fire('Error', 'Address is required.', 'error');
    }
    if (this.fc.password.errors?.minlength[8]) {
    Swal.fire('Error', 'Password must be at least 8 characters long.', 'error');
  }  if (this.fc.password.errors?.passwordWeak) {
    Swal.fire('Error', 'Please enter a strong password.', 'error');
  } 

    return;
  }
}
const fv = this.registerForm.value;
const user : IUserRegister ={
    email:fv.email,
    password:fv.password,
    address:fv.address,
    name:fv.name,
    confirmPassword:fv.confirmPassword
};
this.user.register(user).subscribe(_ =>{
  this.router.navigateByUrl('/login')
})
}

}




