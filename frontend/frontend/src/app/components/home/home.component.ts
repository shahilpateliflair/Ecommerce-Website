import { Component, OnInit } from '@angular/core';
import { emitters } from 'src/emitters/emitter';
import { ActivatedRoute, Data, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';
import { item } from 'src/app/models/item';
import { ItemService } from 'src/app/shared/item.service';
import { tags } from 'src/app/models/tags';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/shared/cart.service';
import { product } from 'src/app/models/products';
import { ProductsService } from 'src/app/shared/products.service';
import { men } from 'src/app/models/men';
import { SearchService } from 'src/app/services/search.service';
import { ProfileService } from 'src/app/shared/profile.service';
import { ToastrService } from 'ngx-toastr';
import { profile } from 'src/app/models/profile';
import { UPLOAD_IMAGE } from 'src/app/shared/constants/urls';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent implements OnInit {
  productss!: any[];
  userProfiles: profile[] = []; 
  searchResults: any[] = [];
  errorMessage: string = '';
  profiles: profile[] = [];
  searchTerm: string = '';
  products: product[] = [];
  mens: men[] = [];
  itm: item[] = [];
  tags: tags[] = [];
  authenticated = false;
  message = '';
  message1 = '';
  message2 = '';
  showSlider: boolean = true;
  items!: item;
  men!: men;
  activeProductId: string | null = null;
  constructor(
    private http: HttpClient,
    private router: Router,
    private item: ItemService,
    private plateformlocation: PlatformLocation,
   private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductsService,
    private searchService:SearchService,
    private profileService:ProfileService,
    private toaster:ToastrService
  ) {
    let itemObservable: Observable<item[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        itemObservable = this.item.getAllItemBySearchTerms(params.searchTerm);
      } else if (params.tag) {
        itemObservable = this.item.getAllItemByTag(params.tag);
      } else {
        itemObservable = item.getAll();
      }

      // itemObservable.subscribe((serverItem) => {
      //   this.itm = serverItem;
      // });
    });

   

    
    // for tags
    // item.getAllTags().subscribe((serverTags) => {
    //   this.tags = serverTags;
    // });

    // activatedRoute.params.subscribe((params) => {
    //   if (params.id)
    //     item.getItemById(params.id).subscribe((serveritem) => {
    //       this.items = serveritem;
    //     });
    // });
  }

  showProductDetails(productId: string): void {
    this.activeProductId = productId;
  }

  getImageUrl(imagePath: product): string {
    // return `https://e-commerce-l2js3q893-shahil-patels-projects.vercel.app/uploadimage/${imagePath}`;
    return `${UPLOAD_IMAGE}${imagePath.imageUrl}`;
  }
  ngOnInit(): void {
    

    this.activatedRoute.paramMap.subscribe(params => {
      const tagName = params.get('tagName');
      if (tagName) {
        this.getProductsByTag(tagName);
      }
    });

    this.activatedRoute.queryParams.subscribe(params => {
      const searchQuery = params['search'];
      if (searchQuery) {
        this.searchProducts(searchQuery);
      }
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showSlider = this.router.url === '/home';
        // this.loadProducts();
      }
    });


   
    };
  
 
  
  

  searchProducts(searchTerm: string) {
    this.productService.searchProducts(searchTerm).subscribe(
      (results: any[]) => {
        this.searchResults = results;
        this.errorMessage = '';
      },
      () => {
        this.searchResults = [];
        this.errorMessage = 'Error occurred while fetching search results.';
      }
    );
    this.searchResults = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getProductsByTag(tagName: string): void {
    this.productService.getProducts(tagName)
      .subscribe(
        (data: any[]) => {
          this.products = data;
        },
        (error:any) => {
          console.error('Error fetching products by tag:', error);
       
        }
      );
  }

}

