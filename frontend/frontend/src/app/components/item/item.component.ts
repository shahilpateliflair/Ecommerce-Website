import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { item } from 'src/app/models/item';
import { men } from 'src/app/models/men';
import { CartService } from 'src/app/shared/cart.service';
import { ItemService } from 'src/app/shared/item.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  items!: item;
  men!:men;
isLast: any;
  constructor(
    private router: Router,
    activatedRoute: ActivatedRoute,
    private item: ItemService,
    private cartService: CartService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        item.getItemById(params.id).subscribe((serveritem) => {
          this.items = serveritem;
        });
      
    });

    
  }

  ngOnInit(): void {}

  // addToCart() {
  //   this.cartService.addToCart(this.items);
  //   this.router.navigateByUrl('/cart');
  // }
}


// activatedRoute.params.subscribe((params) => {
    //   if (params.id)
    //     item.getMenItemById(params.id).subscribe((serveritem) => {
    //       this.items = serveritem;
    //     });
    // });