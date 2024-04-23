import { Component, OnInit } from '@angular/core';
import { orders } from 'src/app/models/orders';
import { OrderService } from 'src/app/shared/order.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit{
orders:any[]=[]
constructor(private order:OrderService,private router:Router){}


ngOnInit(): void {
  this.fetchOrders();
}

fetchOrders(): void {
  this.order.getOrders().subscribe(
    (data: any[]) => {
      this.orders = data;
    },
    (error) => {
      console.error('Error fetching orders:', error);
    }
  );
}
}
