import { Component, Input, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../core/services/translate/translation.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  // @Input() showlinks:boolean=false;
  islogin:boolean=false;
  cartNumbe!:number
  constructor(private flowbiteService: FlowbiteService , public _auth:AuthService,private cart:CartService,private translate:TranslationService ) {

    this.cart.cartNumber.subscribe({
      next:(res)=>{
        this.cartNumbe=res;
      }
    })
  }
  changlang(lang:string){
    localStorage.setItem('lang',lang);
    this.translate.changeDiection()

  }
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
    this._auth.userData.subscribe({
      next:(response)=>{
        if(response !==null){
          this.islogin=true;
        }
        else{
          this.islogin=false;
        }
      }
    })
     
    
  }


  
}
