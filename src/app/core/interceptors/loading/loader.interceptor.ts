import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';



export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  let spnner=inject(NgxSpinnerService);

  spnner.show();
  return next(req).pipe(finalize(()=>{
    spnner.hide();
  }));
};
