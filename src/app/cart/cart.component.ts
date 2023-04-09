import { Component, OnInit } from '@angular/core';
import { CartService } from '../appServices/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthErrorService } from '../appServices/auth-error.service';
import { BehaviorSubject, map } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from '../appServices/orders.service';
import { CommonService } from '../appServices/common.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  loading: boolean = false;

  cartArray : any = [];

  error: string = '';
  
  errText = this.errService.errorMsg;

  totalPrice : any;

  tax : any;

  price : any = 0;

  addressForm !: FormGroup;

  checkoutStatus : boolean = false;

  submitted: boolean = false;

  orderObject : any = [];

  userData: any;

  currentDate: any;

  loader: boolean = true;

  orderLoader : any = [];
  

  constructor(
    public cartService: CartService,
    private toastr: ToastrService,
    private errService: AuthErrorService,
    private orderService : OrdersService,
    private genFake : CommonService,

  ) {

  }

  ngOnInit() {

    this.orderLoader = this.genFake.generateFake(4);

    this.cartService.onGetCart();
    this.onGetCart();
    const userData: any = localStorage.getItem('userData');
    this.userData = JSON.parse(userData);

    
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm:any = today.getMonth() + 1; // Months start at 0!
    let dd:any = today.getDate();
    
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    
    this.currentDate = dd + '/' + mm + '/' + yyyy;

  }

  onGetCart() {

    // const array = this.cartService.cartArray;

    this.addressForm = new FormGroup({
      address: new FormControl('',Validators.required )
    })

    this.cartService.cartArray.subscribe(
      (res:any) => {

        this.cartArray = res;

        console.log(this.cartArray)

        const prices = this.cartArray.map((product:any) => product.price*product.quantity);
        this.price = prices.reduce((acc:any, curr:any) => acc + curr);

        let taxvalue :any;

        taxvalue = ((10/100)*this.price);

        this.tax = ((10/100)*this.price).toFixed(2);


        this.totalPrice = (this.price + taxvalue).toFixed(2);

      }
    )

  }

  onCheckClik() {
    this.checkoutStatus = !this.checkoutStatus;
  }

  onOrder() {
    if(this.addressForm.valid) {

      // const date = new Date()

      this.orderObject = {
        products : this.cartArray,
        ...this.addressForm.value,
        orderPrice : this.totalPrice,
        userId : this.userData.id,
        status: 'processing',
        date: this.currentDate
      }

      this.orderService.onOrderProduct(this.orderObject);

      this.addressForm.setValue({
        address: ''
      });

      this.checkoutStatus = false;

      for(let item of this.cartArray) {
        this.cartService.onRemoveToCart(item.cartId).subscribe(
          (res) => {
            console.log(res);
            this.cartService.onGetCart();
          }
        )
      }

      this.cartService.cartArray.subscribe(
        (res) => {
          console.log(res);
          this.cartArray = [];
        }
      )

      

      // console.log(this.orderObject)
      
    }

    else {
      this.submitted = true;
    }

  }

}
