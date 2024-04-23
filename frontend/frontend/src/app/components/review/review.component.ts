import { HttpHeaders ,HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm ,FormBuilder,FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { review } from 'src/app/interfaces/review';
import { ReviewService } from 'src/app/shared/review.service';
import { UserService } from 'src/app/shared/user.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{
  isAuth: boolean = true;
  userEmail: string = 'shahilpatel688@gmail.com';

  review: review[] = [];


// for post review
  reviewForm!:FormGroup;
  
  reviewes: review = {
    // productName: '',
    email:'',
    // rating: 1,
    comments: '',
    // platformExperience: '',
    username:''
  };
users: any;
  constructor( private userService:UserService,private http: HttpClient,private formBuilder: FormBuilder,private reviews:ReviewService,private toastr:ToastrService,private router:Router){

  }

ngOnInit(): void {
  this.reviewForm = this.formBuilder.group({
    email: ['', Validators.required],
    // rating: [1, Validators.required],
    username: ['', Validators.required],
    comments: ['', Validators.required],
    // platformExperience: ['', Validators.required]
  });

  this.loadReviews();

  this.userService.userObservable.subscribe(user => {
    if (user) {
      this.isAuth = true;
      this.userEmail = user.email;
      console.log('User:', user);
      console.log('isAuth:', this.isAuth);
      console.log('User email:', this.userEmail);
    } else {
      this.isAuth = false;
      this.userEmail = ''; // Make sure userEmail is empty when user is not authenticated
      console.log('User is not authenticated.');
    }
  });

}

// for fetching data
loadReviews() {
  this.reviews.getReview().subscribe((review)=>{
    this.review =review;
  })
}

// for submit review
submitReview() {  
  const token = localStorage.getItem('token');
  if (!token) {
    this.toastr.error("Token not found", "Error");
    return;
  }

  const review: review = {
    // productName: this.reviewForm.value.productName,
    // rating: this.reviewForm.value.rating,
    comments: this.reviewForm.value.comments,
    // platformExperience: this.reviewForm.value.platformExperience,
    username:this.reviewForm.value.username,
   email:this.reviewForm.value.email
  };
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  
  this.reviews.submitReview(review,  headers).subscribe(
    () => {
    
      this.toastr.success('review Submit successfully');
      this.router.navigateByUrl('/review-confirm');
    },
    (error: any) => {
      this.toastr.error('Error subbmitting');
      console.error('Error submitting:', error);
    }
  );
}

   
}



