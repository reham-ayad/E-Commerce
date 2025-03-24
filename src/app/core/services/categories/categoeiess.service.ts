import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../constant/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CategoeiessService {

  constructor(private http:HttpClient ) {}
    getAllcategories():Observable<any>{
      return this.http.get(`${baseUrl.BaseUrl}/categories`)
    }

    getspascificcategory(id:string):Observable<any>{
      return   this.http.get(`${baseUrl.BaseUrl}/categories/${id}`);
   }
   
}
