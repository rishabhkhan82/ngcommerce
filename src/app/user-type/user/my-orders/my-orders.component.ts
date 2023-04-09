import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { AuthErrorService } from 'src/app/appServices/auth-error.service';
import { AuthService } from 'src/app/appServices/auth.service';
import { CommonService } from 'src/app/appServices/common.service';
import { OrdersService } from 'src/app/appServices/orders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  myOrders : any = [];

  orderLoader: any = [];

  loader: boolean = true;

  userId : any = '';

  error: string = '';
  
  errText = this.errService.errorMsg;

  viewAllDisplay : boolean = true;


  constructor(
    private orderService : OrdersService,
    private genFake : CommonService,
    private toastr: ToastrService,
    private errService: AuthErrorService,
    private router: Router
  ) {

  }

  ngOnInit() {

    const url = this.router.url;

    if(url == '/user/orders') {
      this.viewAllDisplay = false;
    }

    this.orderLoader = this.genFake.generateFake(4);

    // this.orderService.onGetOrder();

    this.getOrder();
  
    }

    getOrder() {

      this.orderService.onGetOrder().pipe(map((resData: any) => {
  
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

         let orderArray : any= [];
  
         orderArray = res;

         const userData: any = localStorage.getItem('userData');
          const userDataParse = JSON.parse(userData);

          this.userId = userDataParse.id;

          this.myOrders = orderArray.filter((obj:any) => {
            return obj.userId === this.userId;
          });
          
          this.loader = false;
        },
        (err:any) => {
  
          console.log(err);
  
          if(!err.error || !err.error.error) {
            this.error = this.errText['UNKNOWN'];
            this.toastr.error('', this.error);
          }
  
          else {
            this.error = this.errText[err.error.error.message];
            this.toastr.error('', this.error);
          }
  
        }
      )

    }

    onCancelOrder(item: any) {

      // alert(item);
  
      this.orderService.getSingleOrder(item).subscribe(
        (res) => {
          console.log(res);
  
          var obj:any = res;
  
          obj.status = 'processing';
  
          this.orderService.onEditOrder(item, obj).subscribe(
            (res) => {
              console.log(res);
              this.getOrder();
              this.toastr.success('', 'order cancelled successfully');
            }
          );
        }
      );
  
    }

}
