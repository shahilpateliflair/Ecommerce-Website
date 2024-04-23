import { Component ,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/shared/user.service';
import { user } from 'src/app/models/user';
import { tags } from 'src/app/models/tags';
import { item } from 'src/app/models/item';
import { ItemService } from 'src/app/shared/item.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/cart.service';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit  {
  authenticated = false;
useremail='';
  itm: item[] = [];
  message = '';
  searchTerm = '';
  users!: user;
  tags: tags[] = [];
  showSlider: boolean = true;
  isTagsMenuOpen: boolean = false;
  cartItemCount: number = 0;


  constructor(
    private http: HttpClient,
    private router: Router,
    private userservice: UserService,
    private item: ItemService,
    activatedRoute: ActivatedRoute,
    private toaster:ToastrService,
    private plateformlocation: PlatformLocation,private cart:CartService
  ) {
   
    // activatedRoute.params.subscribe((params) => {
    //   if (params.searchTerm) this.searchTerm = params.searchTerm;
    // });
    userservice.userObservable.subscribe((newUser) => {
      this.users = newUser;
    });
    // item.getAllTags().subscribe((serverTags) => {
    //   this.tags = serverTags;
    // });
    this.updateCartItemCount();

  }
  
  ngOnInit(): void {
    console.log('Email:', this.useremail);
    this.userservice.userObservable.subscribe(user => {
      console.log('User:', user); // Check if user object is received
      this.useremail = user.email;
      
    });
  }

 

  toggleTagsMenu() {
    this.isTagsMenuOpen = !this.isTagsMenuOpen;
    this.showSlider = false; 
  }
  isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  search(Term: string): void {
    if (Term) {
      this.router.navigateByUrl('/search/' + Term);
    } else {
      this.router.navigateByUrl('/home');
    }
    this.showSlider = false;
  }
  updateCartItemCount() {
    const cartItems = this.cart.getCartItems();
    this.cartItemCount = cartItems.length;
}
  logout() {
    
    this.userservice.logout();
    this.router.navigateByUrl('/');
   
  }

  get isAuth() {
    return this.users.token;
  }
}

