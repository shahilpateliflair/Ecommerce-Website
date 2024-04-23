import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from 'src/app/models/user';
import { ProfileService } from 'src/app/shared/profile.service';
import { profile } from 'src/app/models/profile';
import { ToastrService } from 'ngx-toastr';
import { UPLOAD_PROFILE_IMAGE } from 'src/app/shared/constants/urls';
@Component({
  selector: 'app-showprofile',
  templateUrl: './showprofile.component.html',
  styleUrls: ['./showprofile.component.css']
})
export class ShowprofileComponent {
  profiles: profile[] = [];

  constructor(private profileService: ProfileService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.fetchProfiles();
  }

  fetchProfiles() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.toaster.error('Token not found', 'Error');
      return;
    }

    this.profileService.getProfiles(token).subscribe(
      (profiles: profile[]) => {
        this.profiles = profiles;
      },
      (error: any) => {
        console.error('Error fetching profiles:', error);
        this.toaster.error('Error fetching profiles', 'Error');
      }
    );
  }
  getProductImageUrl(product: profile): string {
    return `${UPLOAD_PROFILE_IMAGE}${product.imageUrl}`;
    // return `http://localhost:42000/${product.imageUrl}`;
  }
}

