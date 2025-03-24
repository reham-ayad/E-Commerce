import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './feature/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './feature/layout/main-layout/main-layout.component';
import { authGuard } from './core/guard/auth.guard';
import { checkTokenGuard } from './core/guard/checkToken/check-token.guard';
import { CheckoutComponent } from './feature/pages/checkout/checkout.component';
import { ProductDetailsComponent } from './feature/pages/product-details/product-details.component';

export const routes: Routes = [{path:'',component:AuthLayoutComponent,canActivate:[checkTokenGuard],children:[
    {path:'login',loadComponent:()=>import('./feature/auth/login/login.component').then((c)=>c.LoginComponent)},

    {path:'signup',loadComponent:()=>import('./feature/auth/signup/signup.component').then((c)=>c.SignupComponent)},

]
}

,{path:'',component:MainLayoutComponent,children:[
    {path:' ',redirectTo:'home',pathMatch:'full' } ,

    {path:'home',loadComponent:()=>import('./feature/pages/home/home.component').then((c)=>c.HomeComponent)},



    {path:'brands',loadComponent:()=>import('./feature/pages/brands/brands.component').then((c)=>c.BrandsComponent)},


{path:'productDetails/:id',   data: { renderMode: 'default' } ,component:ProductDetailsComponent},



    {path:'cart',canActivate:[authGuard],loadComponent:()=>import('./feature/pages/cart/cart.component').then((c)=>c.CartComponent)},

    {path:'allorders',canActivate:[authGuard],loadComponent:()=>import('./feature/pages/all-orders/all-orders.component').then((c)=>c.AllOrdersComponent)},

    {path:"checkout/:id",    data: { renderMode: 'default' } ,canActivate:[authGuard] ,component:CheckoutComponent},


    {path:'categories',loadComponent:()=>import('./feature/pages/categories/categories.component').then((c)=>c.CategoriesComponent)},

    {path:'resetpassword',loadComponent:()=>import('./feature/auth/reset-password/reset-password.component').then((c)=>c.ResetPasswordComponent)},


    {path:'notFound',loadComponent:()=>import('./feature/pages/not-found/not-found.component').then((c)=>c.NotFoundComponent)},
    {path:'wish-list',canActivate:[authGuard],loadComponent:()=>import('./feature/pages/wish-list/wish-list.component').then((c)=>c.WishListComponent)},


    

    {path:'products',loadComponent:()=>import('./feature/pages/products/products.component').then((c)=>c.ProductsComponent)},


    

]}












];

