import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformBrowser, CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart/cart.service';
import { CartDetails } from '../../../shared/interface/cart-details';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  totalPrice: number = 0;
  cartNumber!: number;
  cartList: CartDetails[] = [];
  cartId!: string;

  constructor(
    private cart: CartService,
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  getcartproducts() {

    // مهم جدًا مع SSR
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const token = localStorage.getItem('userToken');

    // لو مش عامل Login متطلبش الـ Cart
    if (!token) {
      this.cartList = [];
      this.totalPrice = 0;
      return;
    }

    this.cart.getProduct().subscribe({
      next: (res) => {

        console.log(res);

        this.totalPrice = res.data.totalCartPrice;
        this.cartList = res.data.products;
        this.cartId = res.cartId;

        this.cart.cartNumber.next(res.numOfCartItems);
      },

      error: (err) => {

        console.error('Cart Error:', err);

        // لو التوكن مش صالح
        if (err.status === 401) {
          this.cartList = [];
          this.totalPrice = 0;
          this.cart.cartNumber.next(0);
        }

      }
    });
  }


  updateCart(productId: string, count: number) {

    this.cart.updateProduct(productId, count).subscribe({
      next: (res) => {

        this.totalPrice = res.data.totalCartPrice;
        this.cartList = res.data.products;

        this.cart.cartNumber.next(res.numOfCartItems);

      }
    });
  }


  clearAll() {

    this.cart.clearCart().subscribe({
      next: () => {

        this.getcartproducts();

      }
    });

  }


  removeitem(productId: string) {

    this.cart.removeProduct(productId).subscribe({
      next: (res) => {

        this.totalPrice = res.data.totalCartPrice;
        this.cartList = res.data.products;

        this.cart.cartNumber.next(res.numOfCartItems);

      }
    });

  }


  ngOnInit(): void {
    this.getcartproducts();
  }


  back() {
    this._router.navigate(['/home']);
  }

}