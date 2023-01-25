import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddProductComponent } from "./add-product/add-product.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminNotificationComponent } from "./admin-notification/admin-notification.component";
import { AdminProductsComponent } from "./admin-products/admin-products.component";
import { AdminProfileComponent } from "./admin-profile/admin-profile.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";

@NgModule({
  declarations: [
    AdminDashboardComponent,
    UserDetailComponent,
    OrderDetailComponent,
    AdminNotificationComponent,
    AdminProfileComponent,
    AdminProductsComponent,
    AddProductComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AdminDashboardComponent,
    UserDetailComponent,
    OrderDetailComponent,
    AdminNotificationComponent,
    AdminProfileComponent,
    AdminProductsComponent,
    AddProductComponent,
  ],
  providers: [

  ],
  bootstrap: [

  ]
})

export class AdminModule {

}