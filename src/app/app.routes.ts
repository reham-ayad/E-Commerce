import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './feature/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './feature/layout/main-layout/main-layout.component';
import { authGuard } from './core/guard/auth.guard';
import { checkTokenGuard } from './core/guard/checkToken/check-token.guard';
import { CheckoutComponent } from './feature/pages/checkout/checkout.component';
import { ProductDetailsComponent } from './feature/pages/product-details/product-details.component';
import { CartComponent } from './feature/pages/cart/cart.component';
import { CategoriesComponent } from './feature/pages/categories/categories.component';
import { ResetPasswordComponent } from './feature/auth/reset-password/reset-password.component';
import { title } from 'process';
import { WishListComponent } from './feature/pages/wish-list/wish-list.component';
import { ProductsComponent } from './feature/pages/products/products.component';
import { BrandsComponent } from './feature/pages/brands/brands.component';
import { HomeComponent } from './feature/pages/home/home.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { SignupComponent } from './feature/auth/signup/signup.component';

export const routes: Routes = [{path:'',component:AuthLayoutComponent,canActivate:[checkTokenGuard],children:[
    {path:'login',component:LoginComponent,title:"Login"},

    {path:'signup',component:SignupComponent,title:"SignUp"},

]
}

,{path:'',component:MainLayoutComponent,children:[
    {path:' ',redirectTo:'home',pathMatch:'full' } ,

    {path:'home',component:HomeComponent,title:'Home'},



    {path:'brands',component:BrandsComponent,title:'Brands'},


{path:'productDetails/:id',   data: { renderMode: 'default' } ,component:ProductDetailsComponent},



    {path:'cart',canActivate:[authGuard],component:CartComponent,title:'Cart'},


    {path:"checkout/:id",    data: { renderMode: 'default' } ,canActivate:[authGuard] ,component:CheckoutComponent},


    {path:'categories',component:CategoriesComponent,title:'Categories'},

    {path:'resetpassword',component:ResetPasswordComponent,title:'ForgetPassword'},


    {path:'wish-list',canActivate:[authGuard],component:WishListComponent,title:'WishList'},


    

    {path:'products',component:ProductsComponent,title:'Products'},


    

]}












];

