import { Component } from '@angular/core';
import { BrandService } from '../../../core/services/brand/brand.service';
import { Brands } from '../../../shared/interface/brands/brands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  constructor(private brands:BrandService){}
  id:any;
  brandsList:Brands[]=[];
  ngOnInit(): void {
    this.getallOf()
  }
  getallOf(){
    this.brands.getAllbrands().subscribe({
      next:(res)=>{
        this.brandsList=res.data
      }
    })

  }


 

}
