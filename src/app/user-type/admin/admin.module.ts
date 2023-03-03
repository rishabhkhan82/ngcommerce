import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AddProductComponent } from "./admin-layout/add-product/add-product.component";
import { AdminDashboardComponent } from "./admin-layout/admin-dashboard/admin-dashboard.component";
import { AdminNotificationComponent } from "./admin-layout/admin-notification/admin-notification.component";
import { AdminProductsComponent } from "./admin-layout/admin-products/admin-products.component";
import { AdminProfileComponent } from "./admin-layout/admin-profile/admin-profile.component";
import { OrderDetailComponent } from "./admin-layout/order-detail/order-detail.component";
import { UserDetailComponent } from "./admin-layout/user-detail/user-detail.component";
import { AdminLayoutComponent } from './admin-layout/admin-layout/admin-layout.component';
import { ReactiveFormsModule } from "@angular/forms";


const routes : Routes = [
  { path: '', component : AdminLayoutComponent, children: [
      { path: '', component: AdminDashboardComponent},
      { path: 'profile', component: AdminProfileComponent},
      { path: 'orders', component: OrderDetailComponent},
      { path: 'users', component: UserDetailComponent},
      { path: 'products', component: AdminProductsComponent},
      { path: 'notifications', component: AdminNotificationComponent },
      { path: 'add-product', component: AddProductComponent },
  ], }
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    UserDetailComponent,
    OrderDetailComponent,
    AdminNotificationComponent,
    AdminProfileComponent,
    AdminProductsComponent,
    AddProductComponent,
    AdminLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
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
  constructor() {
    console.log('Admin Module Lazily Loaded');
  }
}