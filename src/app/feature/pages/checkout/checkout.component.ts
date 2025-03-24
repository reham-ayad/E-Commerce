import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  cardId!:string;
constructor(private actvited:ActivatedRoute ,private cart:CartService){
  actvited.params.subscribe({
    next:(res)=>{
      this.cardId=res['id'];
      console.log(res['id'])
    }
  })
}
checkoutForm:FormGroup=new FormGroup({
  details:new FormControl(null),
  city:new FormControl (null),
  phone:new FormControl (null),


})



submit22(){
this.cart.CheckOut(this.cardId,this.checkoutForm.value).subscribe({
  next:(res)=>{
    console.log(res);
    window.location.href=res.session.url;
  }

})
}
}
