import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/shared/user.service';
import { user } from 'src/app/models/user';

import { item } from 'src/app/models/item';
import { ItemService } from 'src/app/shared/item.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/cart.service';
import { product } from 'src/app/models/products';
import { ProductsService } from 'src/app/shared/products.service';
import { SearchService } from 'src/app/services/search.service';
import { DynamicService } from 'src/app/shared/dynamic.service';
import { profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/shared/profile.service';
import { UPLOAD_PROFILE_IMAGE } from 'src/app/shared/constants/urls';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isSidebarOpen: boolean = false;
  authenticated = false;
  useremail = '';
  users!: user;
  message = '';

  itm: item[] = [];
  // tags: tags[] = [];
  
  // profile: profile | null = null; 
  profiles: profile[] = [];
  showSlider: boolean = true;
  isTagsMenuOpen: boolean = false;

  cartItemCount: number = 0;
  selectedImage!: File;
  products: product[] = [];
  searchTerm: string = '';


  filteredProducts: any[] = [];
  searchResults: product[] = [];
  errorMessage: string = '';



  showPopup = false;
  showModal = false;
  imageUrl!: string;
 
  constructor(
    private http: HttpClient,
    private router: Router,
    private userservice: UserService,
    private item: ItemService,
    activatedRoute: ActivatedRoute,
    private toaster: ToastrService,
    private plateformlocation: PlatformLocation,
    private cart: CartService,
    private product: ProductsService,
    private searchService: SearchService,
    private dynamic: DynamicService,
    private profileService:ProfileService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) this.searchTerm = params.searchTerm;
    });
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
    this.userservice.userObservable.subscribe((user) => {
      console.log('User:', user);
      this.useremail = user.email;
    });
    // this.getProfiles();
this.fetchProfiles();
  }

 
  isUserMenuOpen: boolean = false;


  toggleSidebar() {
    console.log('sff',this.isSidebarOpen)
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  logout() {
    this.userservice.logout();
    this.router.navigateByUrl('/');
  }
  searchProducts() {
    if (this.searchTerm.trim() !== '') {
      this.router.navigate(['/'], { queryParams: { search: this.searchTerm } });
    }
  }


  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  filterProductsByCategory(category: string): void {
    // Filter products by category
    this.filteredProducts = this.products.filter(
      (product) => product.category === category
    );
  }
  toggleTagsMenu() {
    this.isTagsMenuOpen = !this.isTagsMenuOpen;
    this.showSlider = false;
  }
  

 
  updateCartItemCount() {
    const cartItems = this.cart.getCartItems();
    this.cartItemCount = cartItems.length;
  }


 
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  uploadImage() {
    if (!this.selectedImage) {
      console.error('No image selected.');
      return;
    }

    this.dynamic.uploadImage(this.selectedImage).subscribe(
      response => {
        console.log('Image uploaded successfully:', response);
        // Handle success
      },
      error => {
        console.error('Error uploading image:', error);
        // Handle error
      }
    );
  }
  
  fetchProfiles() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('/');
      return
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
  togglePopup() {
    this.showPopup = !this.showPopup;
  }
  get isAuth() {
    return this.users.token;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  search(): void {
    if (this.searchTerm.trim() !== '') {
      this.router.navigate(['/home/:searchTerm', this.searchTerm]);
    }
  }
  getProductImageUrl(product: profile): string {
    return `${UPLOAD_PROFILE_IMAGE}${product.imageUrl}`;
    // return `http://localhost:42000/${product.imageUrl}`;
  }
}


