import { Injectable } from '@angular/core';
import { firebaseConfig } from '../app-config';
import { HttpClient } from '@angular/common/http';
import { cartInterface } from '../appInterface/cart.interface';
import { BehaviorSubject, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthErrorService } from './auth-error.service';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiKey = firebaseConfig.databaseURL;

  cartArray = new BehaviorSubject<any | null>(null);

  error: string = '';
  
  errText = this.errService.errorMsg;

  secondCartArray : [] = [];

  constructor(
    public http: HttpClient,
    private toastr: ToastrService,
    private errService: AuthErrorService,
  ) { }

  onAddToCart(object: {}) {
    return this.http.post<cartInterface>(`${this.apiKey}/cart.json`, object).subscribe(
      (res:any) => {
        // this.cartArray.next(object);
        this.onGetCart();
        this.toastr.success('','Item added to your cart');
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

  onGetCart() {
    return this.http.get<any>(`${this.apiKey}/cart.json`).pipe(map((resData: any) => {

      const userArrayTwo: any = [];

      for(const id in resData) {

        if(resData.hasOwnProperty(id)) {
          userArrayTwo.push({
            cartId: id, ...resData[id]
          });
        }

      }

      return userArrayTwo

    })).subscribe((res:any) => {

        const userData: any = localStorage.getItem('userData');
        const userDataParse = JSON.parse(userData);

        // console.log(userDataParse.id);

        const cartArr: any = [];

        for(let item of res) {

          if(item.userId == userDataParse.id) {
            cartArr.push(item);
          }

        }

          this.cartArray.next(cartArr);

          // console.log(item.userId);

        // this.cartArray.next(res);

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

  onRemoveToCart(selectedProductId:any) {
    return this.http.delete(`${this.apiKey}/cart/${selectedProductId}.json`);
  }
  
}
