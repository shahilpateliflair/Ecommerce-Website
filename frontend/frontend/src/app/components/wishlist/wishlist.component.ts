import { Component, NgZone } from '@angular/core';
import { wishlist } from 'src/app/models/wishlist';
import { wishlistitem } from 'src/app/models/wishlistitem';
import { product } from 'src/app/models/products';
import { WishlistService } from 'src/app/shared/wishlist.service';
import { UPLOAD_IMAGE } from 'src/app/shared/constants/urls';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  product!:wishlist;
  products!:any;
  availableSizes: string[] = ['S', 'M', 'L', 'XL'];
  availableColors: string[] = ['Black', 'Blue', 'Gray','Red', 'White'];
    cart!: wishlist;
    isInWishlist: boolean = false;
    
    items: any;
wishlist: any;
  
    constructor(private dynamic: WishlistService,private zone: NgZone) {
      this.wishlist = this.dynamic.getCart();
      this.dynamic.getCartObservable().subscribe((wishlist) => {
        this.cart = wishlist;
      });
    }
  
    ngOnInit(): void {

    
  }
  
  toggleWishlist() {
    this.isInWishlist = !this.isInWishlist;
  }
  removeFromWishlist(itemId: string): void {
    this.dynamic.removeFromCart(itemId);
  }
 
    getProductImageUrl(product: product): string {
      // Assuming imageUrl is a property of your Product model
      // return `https://e-commerce-l2js3q893-shahil-patels-projects.vercel.app/${product.imageUrl}`;
      return `${UPLOAD_IMAGE}${product.imageUrl}`;
    }
    getImageUrlByColor(color: string, items: any): string {
      switch (color) {
        case 'White':
          // return 'http://localhost:42000/uploadimage/' + items.imageUrl;
          return `${UPLOAD_IMAGE}` + items.imageUrl;
          
        case 'Gray':
          // return 'http://localhost:42000/uploadimage/' + items.image1;
          return `${UPLOAD_IMAGE}`  + items.image1;
         
        case 'Blue':
          // return 'http://localhost:42000/uploadimage/' + items.image2;
          return `${UPLOAD_IMAGE}`  + items.image2;
          
        case 'Red':
          // return 'http://localhost:42000/uploadimage/' + items.image3;
          return `${UPLOAD_IMAGE}`  + items.image3;
        
        case 'Black':
          // return 'http://localhost:42000/uploadimage/' + items.image4;
          return `${UPLOAD_IMAGE}`  + items.image4;
          
        default:
          // return 'http://localhost:42000/uploadimage/' + items.imageUrl;
          return `${UPLOAD_IMAGE}`  + items.imageUrl;
          
      }
    }
    removeFromCart(cartItem: wishlistitem) {
      this.dynamic.removeFromCart(cartItem.itm._id);
    }
    getTotalItems(): number {
      if (this.wishlist && this.wishlist.items.length) {
        return this.wishlist.items.length;
      }
      return 0;
    }
  
    getTotalPrice(): number {
      let totalPrice = 0;
      if (this.wishlist && this.wishlist.items.length) {
        totalPrice = this.wishlist.items.reduce((acc: any, item: { itm: { price: any; }; }) => acc + item.itm.price, 0);
      }
      return totalPrice;
    }

}
