import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ReviewService } from 'src/app/shared/review.service';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders } from '@angular/common/http';
import { review } from 'src/app/interfaces/review';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
// review:any;
review: review[] = [];
constructor(private userservice:UserService,private router:Router,private reviews: ReviewService,private toastr:ToastrService){}

ngOnInit(): void {

  this.loadReviews();
  }
  loadReviews() {
    this.reviews.getReview().subscribe((review)=>{
      this.review =review;
    })
  }

  logout() {
    
    this.userservice.logout();
    this.router.navigateByUrl('/login');
    // this.toaster.success('Logged out successfully', 'Success');
  }

}




