// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../services/auth/auth.service';

// export const authGuard: CanActivateFn = (route, state) => {

//   let _auth:AuthService=  inject(AuthService);
//   let router=inject(Router)
//   if (_auth.userData.getValue()!==null){
//     return true;
//   }
// router.navigate(['/login']);
//   return false;
// };
import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  let _auth: AuthService = inject(AuthService);
  let router = inject(Router);

  if (!!_auth.userData.getValue()) {
    return true;
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
