import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {

users:user[]=[];

  constructor(private user:UserService,private router:Router){}

  ngOnInit(): void {
    this.loadUsers();
  }
 

  loadUsers() {
    this.user.getUser().subscribe((user)=>{
      this.users =user;
    })
  }
}


// navigateToUserProfile(userId: string) {
//   // Assuming you have a route defined for the user profile page
//   this.router.navigate(['/user-profile', userId]);
// }