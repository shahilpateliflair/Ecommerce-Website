import { Component, Input, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { item } from 'src/app/models/item';
import { product } from 'src/app/models/products';
import { CartService } from 'src/app/shared/cart.service';
import { DynamicService } from 'src/app/shared/dynamic.service';
import { ProductsService } from 'src/app/shared/products.service';
import { wishlist } from 'src/app/models/wishlist';
import { wishlistitem } from 'src/app/models/wishlistitem';
import { WishlistService } from 'src/app/shared/wishlist.service';
import { UserService } from 'src/app/shared/user.service';
import { user } from 'src/app/models/user';
import { ProductreviewService } from 'src/app/services/productreview.service';
import { Review } from 'src/app/models/productreview';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders } from '@angular/common/http';
import { profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/shared/profile.service';
import { UPLOAD_IMAGE } from 'src/app/shared/constants/urls';
@Component({
  selector: 'app-dynamicdata',
  templateUrl: './dynamicdata.component.html',
  styleUrls: ['./dynamicdata.component.css'],
})
export class DynamicdataComponent {
  product!: wishlist;
  products!: any;
  availableSizes: string[] = ['S', 'M', 'L', 'XL'];
  availableColors: string[] = ['Black', 'Blue', 'Gray', 'Red', 'White'];
  cart!: wishlist;
  isInWishlist: boolean = false;

  items: any;

  useremail = '';
  users!: user;
  selectedSize: string = '';
  productss: product[] = [];
  profiles: profile[] = [];
  selectedRating!: number;
  commentText!: string;
  productId: string | null = null;
  selectedColor: string = 'White';
  imageFilter: string = 'none';
  colors: string[] = ['White', 'Gray', 'Blue', 'Red', 'Black'];
  review: Review = { productId: '', rating: 0, comment: '' };
  isLast: any;
  category!: string;
  reviews: Review[] = [];
  profiless: { [profileId: string]: profile } = {};
  constructor(
    private router: Router,
    private dynamic: DynamicService,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private dynamic1: WishlistService,
    private zone: NgZone,
    private userservice: UserService,
    private productreview: ProductreviewService,
    private toaster: ToastrService,
    private profileService: ProfileService
  ) {
    userservice.userObservable.subscribe((newUser) => {
      this.users = newUser;
    });
  }

  ngOnInit(): void {
    this.fetchProfiles();

    // this.fetchProfilesForReviews();

    if (this.productId) {
      this.fetchReviewsForProduct(this.productId);
    }

    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId) {
        this.fetchReviewsForProduct(this.productId);
      }
    });

    this.route.params.subscribe((params) => {
      const productId = params['id'];

      this.getProductDetails(productId);
      this.isInWishlist = this.dynamic1.isProductInWishlist(productId);
      if (this.items) {
        this.isInWishlist = this.isAddedToWishlist(this.items);
      }

      this.userservice.userObservable.subscribe((user) => {
        console.log('User:', user);
        this.useremail = user.email;
      });
    });

    const cartFromLocalStorage = this.dynamic1.getCartFromLocalStorage();
    if (cartFromLocalStorage) {
      this.cart = cartFromLocalStorage;
    } else {
      this.dynamic1.getCartObservable().subscribe((dynamiccart: wishlist) => {
        this.cart = dynamiccart;
      });
    }

    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
    });
  }

  getProductDetails(productId: string): void {
    this.productService.getProductById(productId).subscribe(
      (product: product) => {
        this.items = product;
        this.products.forEach((product: any) => {
          console.log('Image URLs:', product.imageUrl);
        });
      },
      (error) => {
        console.error('Error fetching product:', error);
        this.items = null;
      }
    );
  }

  addToCart(): void {
    if (this.items) {
      this.dynamic.addToCart(this.items, this.selectedSize, this.selectedColor);
      this.router.navigateByUrl('/dynamiccart');
    } else {
      console.error('Cannot add to cart: No product selected.');
    }
  }

  toggleWishlist(): void {
    this.isInWishlist = !this.isInWishlist;
    if (this.items) {
      if (this.isInWishlist) {
        this.dynamic1.addToCart(
          this.items,
          this.selectedSize,
          this.selectedColor
        );
      } else {
        this.dynamic1.removeFromCart(this.items!._id); // Assert non-null with ! operator
      }
    } else {
      console.error('Cannot add to cart: No product selected.');
    }
  }

  isAddedToWishlist(product: product): boolean {
    return this.dynamic1.isAddedToWishlist(product._id);
  }

  removeFromCart(cartItem: any): void {
    if (cartItem && cartItem.itm._id) {
      this.dynamic1.removeFromCart(cartItem.itm._id);
    }
  }

  getProductImageUrl(product: product): string {
    // return `http://localhost:42000/${product.imageUrl}`;
    return `${UPLOAD_IMAGE}${product.imageUrl}`;
  }
  getImageUrlByColor(color: string, items: any): string {
    switch (color) {
      case 'White':
        return `${UPLOAD_IMAGE}` + items.imageUrl;

      case 'Gray':
        return `${UPLOAD_IMAGE}` + items.image1;

      case 'Blue':
        return `${UPLOAD_IMAGE}` + items.image2;

      case 'Red':
        return `${UPLOAD_IMAGE}` + items.image3;

      case 'Black':
        return `${UPLOAD_IMAGE}` + items.image4;

      default:
        return `${UPLOAD_IMAGE}` + items.imageUrl;
    }
  }
  

  submitReview(): void {
    console.log('productId:', this.productId);
    console.log('users.id:', this.users?.id);

    const token = localStorage.getItem('token');
    if (!token) {
      this.toaster.error('Token not found', 'Error');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    if (!this.productId) {
      this.toaster.error('Product or user information is missing.');
      return;
    }

    this.review.productId = this.productId;

    this.productreview.submitReview(this.review, headers).subscribe(
      () => {
        this.toaster.success('Review submitted successfully');
        this.review = { productId: '', rating: 0, comment: '' };
      },
      (error: any) => {
        this.toaster.error('Failed to submit review');
        console.error('Error submitting review:', error);
      }
    );
  }

  fetchReviewsForProduct(productId: string): void {
    console.log('Fetching reviews for product:', productId);
    this.productreview.getReviewsForProduct(productId).subscribe(
      (reviews: Review[]) => {
        console.log('Received reviews:', reviews);
        this.reviews = reviews;
        // this.fetchProfiles();
        this.fetchProfilesForReviews();
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }
  fetchProfilesForReviews(): void {
    this.profiless = {};

    this.reviews.forEach((review) => {
      if (review.userProfile && review.userProfile.length > 0) {
        review.userProfile.forEach((userProfile) => {
          const profileId =
            typeof userProfile === 'string' ? userProfile : userProfile?.id;
          if (!profileId) {
            console.error('Invalid userProfile:', userProfile);
            return;
          }
          console.log('Received profile ID:', profileId);

          this.profileService.getUserProfile(profileId).subscribe(
            (profile: profile) => {
              if (profile) {
                this.profiless = {
                  ...this.profiless,
                  [profileId]: profile,
                };
                console.log('Fetched Profile:', profile);
                console.log('Profile Name:', profile.name);
              } else {
                console.error(
                  'Received null profile for profile ID:',
                  profileId
                );
              }
            },
            (error: any) => {
              console.error('Error fetching user profile:', error);
            }
          );
        });
      }
    });
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
        this.displayProfileNames();
      },
      (error: any) => {
        console.error('Error fetching profiles:', error);
        this.toaster.error('Error fetching profiles', 'Error');
      }
    );
  }
  displayProfileNames() {
    console.log('Fetched Profiles:', this.profiles);

    this.profiles.forEach((profile) => {
      if (profile.name) {
        console.log('Name:', profile.name);
      } else {
        console.log('Name: Undefined');
      }
    });
  }
}
