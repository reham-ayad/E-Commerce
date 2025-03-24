import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../constant/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http:HttpClient) { }
  getAllbrands():Observable<any>{
    return this.http.get(`${baseUrl.BaseUrl}/brands`)
  }
  getspascificbrand(id:string):Observable<any>{
    return   this.http.get(`${baseUrl.BaseUrl}/brands/${id}`);
 }
}
