import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { UserNotificationComponent } from "./user-notification/user-notification.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { WishlistComponent } from "./wishlist/wishlist.component";

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserProfileComponent,
    MyOrdersComponent,
    WishlistComponent,
    UserNotificationComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    UserDashboardComponent,
    UserProfileComponent,
    MyOrdersComponent,
    WishlistComponent,
    UserNotificationComponent,
  ],
  providers: [

  ],
  bootstrap: [

  ]
})

export class UserModule {

}