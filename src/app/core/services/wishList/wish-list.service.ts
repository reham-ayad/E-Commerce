import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Inject,
  Injectable,
  PLATFORM_ID
} from '@angular/core';

import { Observable } from 'rxjs';

import { CheckOut } from '../../../shared/interface/check-out';
import { baseUrl } from '../../constant/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  token: any = {};

  wishlsitNumber: any = 0;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {

    if (isPlatformBrowser(this.platformId)) {

      const userToken = localStorage.getItem('userToken');

      if (userToken) {
        this.token = {
          Authorization: `Bearer ${userToken}`
        };
      }

    }

    // ❌ متعمليش getProduct هنا
  }


  addProduct(productId: string): Observable<any> {

    return this.http.post(
      `${baseUrl.BaseUrl}/wishlist`,
      { productId },
      {
        headers: this.token
      }
    );

  }


  getProduct(): Observable<any> {

    return this.http.get(
      `${baseUrl.BaseUrl}/wishlist`,
      {
        headers: this.token
      }
    );

  }


  updateProduct(
    productId: string,
    count: number
  ): Observable<any> {

    return this.http.put(
      `${baseUrl.BaseUrl}/wishlist/${productId}`,
      { count },
      {
        headers: this.token
      }
    );

  }


  removeProduct(productId: string): Observable<any> {

    return this.http.delete(
      `${baseUrl.BaseUrl}/wishlist/${productId}`,
      {
        headers: this.token
      }
    );

  }


  clearwishlist(): Observable<any> {

    return this.http.delete(
      `${baseUrl.BaseUrl}/wishlist/`,
      {
        headers: this.token
      }
    );

  }


  CheckOut(
    wishlistId: string,
    payload: CheckOut
  ): Observable<any> {

    return this.http.post(
      `${baseUrl.BaseUrl}/orders/checkout-session/${wishlistId}?url=http://localhost:4200`,
      {
        shappingaddress: payload
      },
      {
        headers: this.token
      }
    );

  }

}