
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  CurrencyPipe,
  DatePipe,
  UpperCasePipe
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ProductsService } from '../../../core/services/products/products.service';
import { Products } from '../../../shared/interface/products/products';
import { FilterPipe } from '../../../shared/pipe/filter.pipe';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishListService } from '../../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-products',
  imports: [
    CurrencyPipe,
    UpperCasePipe,
    DatePipe,
    FilterPipe,
    FormsModule,
    RouterLink,
    MatSnackBarModule
  ],
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  searchValue: string = '';
  productlist: Products[] = [];
  date = new Date();

  constructor(
    private product: ProductsService,
    private cart: CartService,
    private wish: WishListService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllproducts();
  }

  addToCart(productId: string): void {
    this.cart.addProduct(productId).subscribe({
      next: (res) => {
        this.snackBar.open(
          res.message || 'Product added to cart successfully!',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          }
        );

        if (res.numOfCartItems !== undefined) {
          this.cart.cartNumber.next(res.numOfCartItems);
        }
      },
      error: (err) => {
        this.snackBar.open(
          err.error?.message || 'Could not add product to cart.',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          }
        );
      }
    });
  }

  addTowishlist(productId: string): void {
    this.wish.addProduct(productId).subscribe({
      next: (res) => {
        this.snackBar.open(
          res.message || 'Product added to wishlist successfully!',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['wishlist-snackbar']
          }
        );
      },
      error: (err) => {
        this.snackBar.open(
          err.error?.message || 'Could not add product to wishlist.',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          }
        );
      }
    });
  }

  getAllproducts(): void {
    this.product.getProducts().subscribe({
      next: (res) => {
        this.productlist = res.data;
      },
      error: () => {
        this.snackBar.open('Failed to load products.', 'Close', {
          duration: 3000
        });
      }
    });
  }
}
