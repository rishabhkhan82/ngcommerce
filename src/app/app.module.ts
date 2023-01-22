import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './common-pages/home/home.component';
import { AboutComponent } from './common-pages/about/about.component';
import { ContactComponent } from './common-pages/contact/contact.component';
import { ProductListingComponent } from './product/product-listing/product-listing.component';
import { ProductIndividualComponent } from './product/product-individual/product-individual.component';
import { ProductSearchComponent } from './product/product-search/product-search.component';
import { RatingsComponent } from './ratings/ratings.component';
import { PaymentComponent } from './payment/payment.component';
import { AdminDashboardComponent } from './user-type/admin/admin-dashboard/admin-dashboard.component';
import { UserDetailComponent } from './user-type/admin/user-detail/user-detail.component';
import { OrderDetailComponent } from './user-type/admin/order-detail/order-detail.component';
import { AdminNotificationComponent } from './user-type/admin/admin-notification/admin-notification.component';
import { UserDashboardComponent } from './user-type/user/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-type/user/user-profile/user-profile.component';
import { MyOrdersComponent } from './user-type/user/my-orders/my-orders.component';
import { WishlistComponent } from './user-type/user/wishlist/wishlist.component';
import { AddressComponent } from './user-type/user/address/address.component';
import { UserNotificationComponent } from './user-type/user/user-notification/user-notification.component';
import { HeaderComponent } from './common-pages/header/header.component';
import { FooterComponent } from './common-pages/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProductListingComponent,
    ProductIndividualComponent,
    ProductSearchComponent,
    RatingsComponent,
    PaymentComponent,
    AdminDashboardComponent,
    UserDetailComponent,
    OrderDetailComponent,
    AdminNotificationComponent,
    UserDashboardComponent,
    UserProfileComponent,
    MyOrdersComponent,
    WishlistComponent,
    AddressComponent,
    UserNotificationComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
