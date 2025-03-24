import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const hraderInterceptor: HttpInterceptorFn = (req, next) => {
 let paltform=     inject(PLATFORM_ID);
 if(isPlatformBrowser(paltform)){
         req=req.clone({
  setHeaders:{token:localStorage.getItem('userToken')||''}
})
}

  return next(req);
};
