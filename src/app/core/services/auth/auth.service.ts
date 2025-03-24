import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../../../shared/interface/auth';
import { jwtDecode } from "jwt-decode";
import{JwtPayload}from './../../../../../node_modules/jwt-decode/build/cjs/index.d'
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { baseUrl } from '../../constant/baseUrl';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  userData:BehaviorSubject<null | JwtPayload>=new BehaviorSubject <null| JwtPayload>(null);
  constructor(private _http:HttpClient, @Inject(PLATFORM_ID) Id:object, private router:Router) { 
    if (isPlatformBrowser(Id)){
      if(localStorage.getItem('userToken')!==null){
        this.decodeData(); 
      }
    }
  }
  signup(FormData:Auth):Observable<any>{
    return this._http.post(`${baseUrl.BaseUrl}/auth/signup`,FormData)
  }
  login(FormData:Auth):Observable<any>{
    return this._http.post(`${baseUrl.BaseUrl}/auth/signin`,FormData)
  }

  decodeData(){
    const token =localStorage.getItem('userToken')||'';
    const decoded = jwtDecode(token);
this.userData.next(decoded);
// console.log(this.userData);

  }

  logOut(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this.router.navigate(['/login'])
  }

}

