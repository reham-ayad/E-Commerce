import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../../shared/interface/auth';
import { Observable } from 'rxjs';
import { baseUrl } from '../constant/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http:HttpClient) { }
  verfyEmail(payload:Auth):Observable<any>{
return this.http.post(`${baseUrl.BaseUrl}/auth/forgotPasswords`,payload)
  }
  verfyCode(payload:Auth):Observable<any>{
    return this.http.post(`${baseUrl.BaseUrl}/auth/verifyResetCode`,payload)
      }
      resetpassword(payload:Auth):Observable<any>{
        return this.http.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,payload)
          }
}
// https://ecommerce.routemisr.com/api/v1