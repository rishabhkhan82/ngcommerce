import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { AuthErrorService } from 'src/app/appServices/auth-error.service';
import { CommonService } from 'src/app/appServices/common.service';
import { OrdersService } from 'src/app/appServices/orders.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  selectValue: any;

  viewAll : boolean = true;

  orderLoader: any = [];

  loading: boolean = true;

  error: string = '';
  
  errText = this.errService.errorMsg;

  orderArray : any = [];

  loader : boolean = true;

  editMode : boolean = false;

  constructor(
    private router: Router,
    private fakeGen: CommonService,
    private orderService : OrdersService,
    private genFake : CommonService,
    private toastr: ToastrService,
    private errService: AuthErrorService,
  ) {

  }

  ngOnInit() {
    const url = this.router.url;
    this.orderLoader = this.fakeGen.generateFake(4);

    if(url === '/admin/orders') {
      this.viewAll = false;
    }
    else {
      this.viewAll = true;
    }

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
        this.orderArray = res;
        this.loader = false;
      },
      (err:any) => {

        console.log(err);

        this.loader = false;

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

  onEditStatus(item: any, selectedValue:any) {

    console.log(item);

    this.orderService.getSingleOrder(item).subscribe(
      (res) => {
        console.log(res);

        var obj:any = res;

        obj.status = selectedValue.target.value;

        this.orderService.onEditOrder(item, obj).subscribe(
          (res) => {
            console.log(res);
            this.toastr.success('', 'Status updated successfully');
            this.editMode = false;
            this.getOrder();
          }
        );
      }
    );

  }

  onEditMode() {
    this.editMode = !this.editMode;
  }

}
