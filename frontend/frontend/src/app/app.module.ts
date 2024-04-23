import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, NgForm } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { SellerComponent } from './components/seller/seller.component';
import { CartComponent } from './components/cart/cart.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyComponent } from './components/verify/verify.component';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { HttpClient } from '@angular/common/http';
import { RatingModule, StarRatingComponent } from 'ng-starrating';
import { ItemComponent } from './components/item/item.component';
import { TitleComponent } from './components/title/title.component';
import { NotFoundComponent } from './partial/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SliderComponent } from './slider/slider.component';
import { RegisterComponent } from './components/register/register.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderItemListComponent } from './components/order-item-list/order-item-list.component';
import { AuthInterceptor } from './auth.interceptor';
import { MapComponent } from './partials/map/map.component';
import { PaymentComponent } from './components/payment/payment.component';
import { FooterComponent } from './components/footer/footer.component';
import { TagComponent } from './components/tag/tag.component';
import { PaypalComponent } from './components/paypal/paypal.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ReviewComponent } from './components/review/review.component';
import { ReviewConfirmComponent } from './partial/review-confirm/review-confirm.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { UserdataComponent } from './partial/userdata/userdata.component';
import { UserOrderComponent } from './partial/user-order/user-order.component';
import { AboutComponent } from './partial/about/about.component';
import { EditComponent } from './partial/edit/edit.component';
import { CollectionComponent } from './partial/collection/collection.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { SettingsComponent } from './partial/settings/settings.component';
import { AddsComponent } from './partial/adds/adds.component';
import { DynamicproductComponent } from './components/dynamicproduct/dynamicproduct.component';
import { DynamicdataComponent } from './components/dynamicdata/dynamicdata.component';
import { ProductComponent } from './components/product/product.component';
import { DynamiccartComponent } from './components/dynamiccart/dynamiccart.component';
import { SearchComponent } from './options/search/search.component';
import { ShowprofileComponent } from './partial/showprofile/showprofile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { GetorderComponent } from './partial/getorder/getorder.component';
import { ContactUsComponent } from './partial/contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    HomeComponent,
    SellerComponent,
    CartComponent,
    ForgotPasswordComponent,
    VerifyComponent,
    ItemComponent,
   
    NotFoundComponent,
    LoginComponent,
    SliderComponent,
    RegisterComponent,
    LoadingComponent,
   CheckoutComponent,
    OrderItemListComponent,
    MapComponent,
    PaymentComponent,
    FooterComponent,
    TagComponent,
    PaypalComponent,
    AdminDashboardComponent,
    ReviewComponent,
    ReviewConfirmComponent,
    AdminHeaderComponent,
    UserdataComponent,
    UserOrderComponent,
    AboutComponent,
    EditComponent,
TitleComponent,
CollectionComponent,
PaymentsComponent,
SettingsComponent,
AddsComponent,
DynamicproductComponent,
DynamicdataComponent,
ProductComponent,
DynamiccartComponent,
SearchComponent,
ShowprofileComponent,
WishlistComponent,
GetorderComponent,
ContactUsComponent,

   
   
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RatingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    }),
    
   
   
    
 
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
