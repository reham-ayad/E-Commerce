import { Routes } from '@angular/router';

// Layouts
import { AuthLayoutComponent } from './feature/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './feature/layout/main-layout/main-layout.component';

// Auth
import { LoginComponent } from './feature/auth/login/login.component';
import { SignupComponent } from './feature/auth/signup/signup.component';
import { ResetPasswordComponent } from './feature/auth/reset-password/reset-password.component';

// Pages
import { HomeComponent } from './feature/pages/home/home.component';
import { ProductsComponent } from './feature/pages/products/products.component';
import { CategoriesComponent } from './feature/pages/categories/categories.component';
import { BrandsComponent } from './feature/pages/brands/brands.component';
import { ProductDetailsComponent } from './feature/pages/product-details/product-details.component';
import { CartComponent } from './feature/pages/cart/cart.component';
import { WishListComponent } from './feature/pages/wish-list/wish-list.component';
import { CheckoutComponent } from './feature/pages/checkout/checkout.component';

// Guards
import { authGuard } from './core/guard/auth.guard';
import { checkTokenGuard } from './core/guard/checkToken/check-token.guard';

export const routes: Routes = [

  // ========================================
  // DEFAULT
  // ========================================

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  // ========================================
  // AUTH
  // ========================================

  {
    path: '',
    component: AuthLayoutComponent,
    children: [

      {
        path: 'login',
        component: LoginComponent,
        canActivate: [checkTokenGuard],
        title: 'Login'
      },

      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [checkTokenGuard],
        title: 'Sign Up'
      },

      {
        path: 'resetpassword',
        component: ResetPasswordComponent,
        canActivate: [checkTokenGuard],
        title: 'Forget Password'
      }

    ]
  },

  // ========================================
  // MAIN
  // ========================================

  {
    path: '',
    component: MainLayoutComponent,
    children: [

      {
        path: 'home',
        component: HomeComponent,
        title: 'Home'
      },

      {
        path: 'products',
        component: ProductsComponent,
        title: 'Products'
      },

      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories'
      },

      {
        path: 'brands',
        component: BrandsComponent,
        title: 'Brands'
      },

      {
        path: 'product-details/:id',
        component: ProductDetailsComponent,
        title: 'Product Details'
      },

      {
        path: 'cart',
        component: CartComponent,
        canActivate: [authGuard],
        title: 'Cart'
      },

      {
        path: 'wish-list',
        component: WishListComponent,
        canActivate: [authGuard],
        title: 'Wishlist'
      },

      {
        path: 'checkout/:id',
        component: CheckoutComponent,
        canActivate: [authGuard],
        title: 'Checkout'
      }

    ]
  },

  // ========================================
  // NOT FOUND
  // ========================================

  {
    path: '**',
    redirectTo: 'home'
  }

];