import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit{
  isLoading!: boolean ;
  constructor(private loading:LoadingService){
    loading.isLoading.subscribe((isLoading)=>{
this.isLoading =isLoading;
    })
  
  }
 
  ngOnInit(): void {
    
  }
}
