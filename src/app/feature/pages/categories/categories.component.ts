import { Component } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../shared/interface/products/products';
import { CategoeiessService } from '../../../core/services/categories/categoeiess.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
 constructor(private category:CategoeiessService,private tost:ToastrService,){}
 categoryList:Category[]=[];
 ngOnInit(): void {
  this.getallOf()
 }
 getallOf(){
  this.category.getAllcategories().subscribe({
    next:(res)=>{
      this.categoryList=res.data;
      console.log(res);
    }
  })
 }

}
