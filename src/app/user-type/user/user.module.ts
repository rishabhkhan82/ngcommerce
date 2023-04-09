import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { UserNotificationComponent } from "./user-notification/user-notification.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { WishlistComponent } from "./wishlist/wishlist.component";
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";


const routes : Routes = [
  { path: '', component : UserLayoutComponent, children: [
      { path: '', component: UserDashboardComponent},
      { path: 'profile', component: UserProfileComponent},
      { path: 'orders', component: MyOrdersComponent},
      // { path: 'wishlist', component: WishlistComponent},
      // { path: 'notifications', component: UserNotificationComponent },
  ], }
];

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserProfileComponent,
    MyOrdersComponent,
    WishlistComponent,
    UserNotificationComponent,
    UserLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
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
    constructor() {
      console.log('user module lazily loaded');
    }
}