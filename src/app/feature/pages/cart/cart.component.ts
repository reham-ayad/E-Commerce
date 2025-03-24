import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { CartDetails } from '../../../shared/interface/cart-details';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  totalPrice:number=0;
  cartNumber!:number;
  cartList:CartDetails []=[];
  router: any;
  cartId!:string
  constructor(private cart:CartService,private _router:Router){}
  getcartproducts(){
    this.cart.getProduct().subscribe({
      next:(res)=>{
        console.log(res);

        this.totalPrice=res.data.totalCartPrice;
        this.cartList=res.data.products;
        this.cartId=res.cartId;
        this.cart.cartNumber.next(res.numOfCartItems);



      }
    })

  }


updateCart(productId:string,count:number){
  this.cart.updateProduct(productId,count).subscribe({
    next:(res)=>{
      this.totalPrice=res.data.totalCartPrice;
        this.cartList=res.data.products;
        this.cart.cartNumber.next(res.numOfCartItems);


    }
  })
}



clearAll(){
  this.cart.clearCart().subscribe({
next:(res)=>{
  
  this.getcartproducts()

}
  })
    
  }

removeitem(productId:string){
  this.cart.removeProduct(productId).subscribe({
    next:(res)=>{
      this.totalPrice=res.data.totalCartPrice;
      this.cartList=res.data.products;
      this.cart.cartNumber.next(res.numOfCartItems);


    }
  })
}



  ngOnInit(): void {
   this.getcartproducts()
    
  }
back(){
  this._router.navigate(['/home']);
 

}
}
