import { Component, OnInit } from '@angular/core';
import { CartDetails } from '../../../shared/interface/cart-details';
import { WishListService } from '../../../core/services/wishList/wish-list.service';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../../shared/pipe/filter.pipe';
import { WishList } from '../../../shared/interface/wish/wish-list';
import { count } from 'console';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-wish-list',
  imports: [CurrencyPipe,UpperCasePipe,DatePipe,FilterPipe,FormsModule,RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
  count:number=0
  totalPrice:number=0;
  cartNumber!:number;
  wishList:WishList []=[];
  router: any;
  wishlsitId!:string
  constructor(private wishlsit:WishListService,private _router:Router,private cart:CartService, private toastr: ToastrService){}
  getwishlsitproducts(){
    this.wishlsit.getProduct().subscribe({
      next:(res)=>{
        // this.totalPrice=res.data.totalwishlsitPrice;
        this.wishList=res.data;
        this.count=res.count
        console.log(res);
        this.wishlsitId=res.wishlsitId;
        // this.wishlsit.wishlsitNumber.next(res.numOfwishlsitItems);



      }
    })

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

updatewishlsit(productId:string,count:number){
  this.wishlsit.updateProduct(productId,count).subscribe({
    next:(res)=>{
      console.log(res);
      this.totalPrice=res.data.totalwishlsitPrice;
        this.wishList=res.data.products;
        this.wishlsit.wishlsitNumber.next(res.numOfwishlsitItems);


    }
  })
}



clearAll(){
  this.wishlsit.clearwishlist().subscribe({
next:(res)=>{
  console.log(res)
  this.getwishlsitproducts()

}
  })
    
  }

removeitem(productId:string){
  this.wishlsit.removeProduct(productId).subscribe({
    next:(res)=>{
      this.totalPrice=res.data.totalwishlsitPrice;
      this.wishList=res.data.products;


    }
  })
}



  ngOnInit(): void {
   this.getwishlsitproducts()
    
  }
back(){
  this._router.navigate(['/home']);
 

}
}
