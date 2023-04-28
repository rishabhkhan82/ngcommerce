import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AdminNotificationService } from 'src/app/appServices/admin-notification.service';
import { AuthService } from 'src/app/appServices/auth.service';
import { OrdersService } from 'src/app/appServices/orders.service';
import { ProductService } from 'src/app/appServices/product.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  usersLenth: any = '';

  productLength: any = '';

  notiLength: any = '';

  orderLength: any = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private product: ProductService,
    private notify: AdminNotificationService,
    private orderServide: OrdersService
  ) {

  }

  ngOnInit() {
    this.getUserLength();
    this.getOrderLength();
    this.getProductLength();
    this.getNotifyLength();
  }

  getUserLength() {
    this.auth.onGetAddedDataBaseUser().subscribe(
      (res) => {
        this.usersLenth = res.length;
      }
    );
  }

  getOrderLength() {

    this.orderServide.onGetOrder().pipe(map((resData: any) => {
  
      const userArrayTwo: any = [];

      for(const id in resData) {

        if(resData.hasOwnProperty(id)) {
          userArrayTwo.push({
            orderId: id, ...resData[id]
          });
        }

      }

      return userArrayTwo

    })).subscribe((res:any) => {
      this.orderLength = res.length;
     })
  }

  getProductLength() {
    this.product.onGetProduct().pipe(map((resData: any) => {
      const userArrayTwo: any = [];
      for(const id in resData) {
        if(resData.hasOwnProperty(id)) {
          userArrayTwo.push({
            id: id, ...resData[id]
          });
        }
      }
      return userArrayTwo
    })).subscribe(
      (res) => {
        this.productLength = res.length;
      }
    )
  }

  getNotifyLength() {
    this.notify.onGetAdminNotification().pipe(map((resData: any) => {
      const userArrayTwo: any = [];
      for(const id in resData) {
        if(resData.hasOwnProperty(id)) {
          userArrayTwo.push({
            id: id, ...resData[id]
          });
        }
      }
      return userArrayTwo
    })).subscribe(
      (res) => {
        this.notiLength = res.length;
      }
    )
  }

}
