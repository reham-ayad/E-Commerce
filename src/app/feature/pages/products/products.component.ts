import { Component } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { Products } from '../../../shared/interface/products/products';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { OnSalePipe } from '../../../shared/pipe/on-sale.pipe';
import { FilterPipe } from '../../../shared/pipe/filter.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe,UpperCasePipe,DatePipe,FilterPipe,FormsModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  searchValue:string='';
  productlist:Products[]=[];
  date=new Date();
  constructor(private product:ProductsService ,private cart:CartService, private toastr: ToastrService,private wish:WishListService ){}

ngOnInit(): void {
  this.getAllproducts();
  
} 
addToCart(productId:string){
  this.cart.addProduct(productId).subscribe({
    next:(res)=>{
      this.toastr.success(res.message,'',{ 
      closeButton:true,
      progressBar:true,
      progressAnimation:'increasing'
    })

    console.log(res.message);
    this.cart.cartNumber.next(res.numOfCartItems);


    }
   
  })
}
addTowishlist(productId:string){
  this.wish.addProduct(productId).subscribe({
    next:(res)=>{
      this.toastr.success(res.message,'',{ 
        closeButton:true,
        progressBar:true,
        progressAnimation:'increasing'
      })

    }
  })
}


  getAllproducts(){
    this.product.getProducts().subscribe({
      next:(res)=>{
this.productlist=res.data;
      }
    })

  }
  }


