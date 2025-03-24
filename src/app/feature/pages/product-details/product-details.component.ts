import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { Products } from '../../../shared/interface/products/products';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  id:any;
  productDetails!:Products;
  constructor(private ActivatedRoute:ActivatedRoute,private product:ProductsService ,private cart:CartService, private toastr: ToastrService){
    ActivatedRoute.params.subscribe(res=>{
      this.id=res['id'];
      console.log(this.id);


    })
  }
  ngOnInit(): void {
    this.getspacificproduct();
    
    
  }
  getspacificproduct(){
    this.product.getspascificProduct(this.id).subscribe({
      next:(respon)=>{
        // console.log(respon)
        this.productDetails=respon.data;
      }
    });
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

}
