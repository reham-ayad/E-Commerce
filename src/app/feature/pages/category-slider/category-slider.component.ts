import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { NgFor } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from '../../../shared/interface/products/products';

@Component({
  selector: 'app-category-slider',
  imports: [NgFor,CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit {



  categorylist:Category[]=[]
  constructor(private category:CategoryService){

  }
getAllcategorise(){
  this.category.getAllcategory().subscribe({
    next:(res)=>{
this.categorylist=res.data
    }
  })
}

ngOnInit(): void {
  this.getAllcategorise()
}



customOptions: OwlOptions = {
  rtl:true,

  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}
}
