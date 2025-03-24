import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../constant/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
  getAllcategory():Observable<any>{
    return this.http.get(`${baseUrl.BaseUrl}/categories`)
  }
}
