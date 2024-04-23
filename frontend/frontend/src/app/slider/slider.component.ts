import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router , Event, NavigationStart, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit{
  images = [
    { src: 'assets/1.png', alt: 'image1', index: 0 },
    { src: 'assets/2.png', alt: 'image2', index: 1 },
    { src: 'assets/3.png', alt: 'image3', index: 2 },
    { src: 'assets/4.png', alt: 'image4', index: 3 }
  ];
  currentIndex = 0;
  showSlider = true;
  sliderInterval: any;
  constructor(private router: Router) {}

 
  ngOnInit() {
    this.startSlider();
  }

  startSlider() {
    this.sliderInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 2000);
  }
  ngOnDestroy() {
    clearInterval(this.sliderInterval);
  }
}

