import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const handelErrorInterceptor: HttpInterceptorFn = (req, next) => {


  let toster= inject(ToastrService)
  return next(req).pipe(catchError((err)=>{
    toster.error(err.error.message ,'', {
      timeOut: 90, 
      closeButton: true,   
      progressBar: true,   
      progressAnimation: 'increasing', 
      positionClass: 'toast-top-left', 
      
    })
    // console.log("error")
    return throwError(()=>err)

  }))
};
