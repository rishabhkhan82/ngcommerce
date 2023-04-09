import { Injectable } from '@angular/core';
import { firebaseConfig } from '../app-config';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthErrorService } from './auth-error.service';
import { orderInterface } from '../appInterface/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiKey = firebaseConfig.databaseURL;

  // orderArray = new BehaviorSubject<any | null>(null);

  // loader = new BehaviorSubject<boolean | null>(true);

  error: string = '';
  
  errText = this.errService.errorMsg;

  constructor(
    public http: HttpClient,
    private toastr: ToastrService,
    private errService: AuthErrorService,
  ) { }

  onOrderProduct(object: {}) {
    return this.http.post<orderInterface>(`${this.apiKey}/order.json`, object).subscribe(
      (res:any) => {
        // this.cartArray.next(object);
        this.onGetOrder();
        this.toastr.success('','Your order is successfull');
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

  onGetOrder() {
    return this.http.get<orderInterface>(`${this.apiKey}/order.json`)
  }

  onEditOrder(itemId: any, data: any) {
    return this.http.put<orderInterface>(`${this.apiKey}/order/${itemId}.json`, data);
  }

  getSingleOrder(itemId: any) {
    return this.http.get<orderInterface>(`${this.apiKey}/order/${itemId}.json`);
  }

  // onRemoveToCart(selectedProductId:any) {
  //   return this.http.delete(`${this.apiKey}/cart/${selectedProductId}.json`);
  // }
  
}
