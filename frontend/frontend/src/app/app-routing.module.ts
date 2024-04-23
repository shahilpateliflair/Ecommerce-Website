import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SellerComponent } from './components/seller/seller.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';

import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyComponent } from './components/verify/verify.component';
import { AuthGuard } from './auth.guard';
import { ItemComponent } from './components/item/item.component';
// import { TitleComponent } from './partial/title/title.component';

import { NotFoundComponent } from './partial/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderItemListComponent } from './components/order-item-list/order-item-list.component';
import { PaymentComponent } from './components/payment/payment.component';
import { FooterComponent } from './components/footer/footer.component';
import { TagComponent } from './components/tag/tag.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ReviewComponent } from './components/review/review.component';
import { ReviewConfirmComponent } from './partial/review-confirm/review-confirm.component';
import { SliderComponent } from './slider/slider.component';
import { UserdataComponent } from './partial/userdata/userdata.component';
import { UserOrderComponent } from './partial/user-order/user-order.component';
import { AboutComponent } from './partial/about/about.component';
import { EditComponent } from './partial/edit/edit.component';
import { Title } from '@angular/platform-browser';
import { TitleComponent } from './components/title/title.component';
import { CollectionComponent } from './partial/collection/collection.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { SettingsComponent } from './partial/settings/settings.component';
import { AddsComponent } from './partial/adds/adds.component';
import { DynamicproductComponent } from './components/dynamicproduct/dynamicproduct.component';
import { DynamicdataComponent } from './components/dynamicdata/dynamicdata.component';
import { DynamiccartComponent } from './components/dynamiccart/dynamiccart.component';
import { SearchComponent } from './options/search/search.component';
import { ShowprofileComponent } from './partial/showprofile/showprofile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { GetorderComponent } from './partial/getorder/getorder.component';
import { PaypalComponent } from './components/paypal/paypal.component';
import { ContactUsComponent } from './partial/contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'header',
    component: HeaderComponent,
  },
  {
    path: 'slider',
    component: SliderComponent,
  },

  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate:[AuthGuard]
  },

  {
    path: 'footer',
    component: FooterComponent,
  },
  {
    path: 'review-confirm',
    component: ReviewConfirmComponent,
    canActivate:[AuthGuard]
  },
  // { path: '**', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'loading',
    component: LoadingComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'showProfile',
    component: ShowprofileComponent,
  },
  {
    path: 'showProfile/:id',
    component: ShowprofileComponent,
  },
  {
    path: 'review',
    component: ReviewComponent,
  },
  {
    path: 'getOrder',
    component: GetorderComponent,
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
  },

  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'order-item-list',
    component: OrderItemListComponent,
  },

  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'home/:searchTerm',
    component: HomeComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'userdata',
    component: UserdataComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'edit',
    component: EditComponent,
  },
  {
    path: 'payments',
    component: PaymentsComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'add/:id',
    component: EditComponent,
  },
  {
    path: 'userorder',
    component: UserOrderComponent,
  },
  {
    path: 'title',
    component: TitleComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'collection',
    component: CollectionComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'seller',
    component: SellerComponent,
  },
  {
    path: 'forget-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'verify',
    component: VerifyComponent,
  },
  {
    path: 'tag',
    component: TagComponent,
  },
  {
    path: 'dynamicproduct',
    component: DynamicproductComponent,
  },
  {
    path: 'search/:searchTerm',
    component: HomeComponent,
  },
  {
    path: 'item/:id',
    component: ItemComponent,
  },
  {
    path: 'tag/:tag',
    component: HomeComponent,
  },
  {
    path: 'dynamic',
    component: DynamicdataComponent,
  },
  {
    path: 'product/:id',
    component: DynamicdataComponent,
  },
  {
    path: 'product',
    component: DynamicdataComponent,
  },
  {
    path: 'dynamiccart',
    component: DynamiccartComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'adds',
    component: AddsComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'paypal',
    component: PaypalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// isAuthenticated(): boolean {
// const token = localStorage.getItem('token');
// this.isAuthenticated = !!token;
// return this.isAuthenticated;
// }
