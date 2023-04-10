import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/appServices/auth.service';
import { ProductService } from 'src/app/appServices/product.service';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { CartService } from 'src/app/appServices/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-individual',
  templateUrl: './product-individual.component.html',
  styleUrls: ['./product-individual.component.css']
})
export class ProductIndividualComponent {


  dynamicId: any;
  loader:boolean=true;
  item: any= [];
  sizeArray: any = [];
  isLogIn : boolean = false;
  cartData : any = [];
  quantity : number = 1;
  removeItemMode: boolean = false;
  cartId : string = '';
  loaderSpin: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private du: ProductService,
    private auth: AuthService,
    private confirmDialog: NgxBootstrapConfirmService,
    private router: Router,
    private cartService : CartService,
    private toastr: ToastrService
    ) {

  }  

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(
      (param:any) => {
        // console.log(param.get('userId'));
        this.dynamicId = param.get('userId');
        // console.log(this.dynamicId);
        this.du.getSingleData(this.dynamicId).subscribe(
          (res) => {
            // console.log(res);  
            this.loader=false;
            this.item = res;
            this.sizeArray = this.item.size;
          }
        );
        // this.name = this.item.name;
        // this.tech = this.item.technology;

      });

      this.cartService.cartArray.subscribe(
        (res: any) =>  {
          // console.log(res);

          const routeUrl = this.router.url;

          const prodId = routeUrl.substring(9,routeUrl.length)

          for(let item of res) {

            if(prodId == item.productId) {
              this.removeItemMode = true;
              this.cartId = item.cartId;

              // console.log( item.cartId);
            }

          }

          // for(let item of  Object.keys(res)) {

          //   if(prodId == res[item].productId) {
          //     this.removeItemMode = true;
          //     this.cartId = res[item].cartId;

          //     console.log( res[item].cartId);
          //   }

          // }


        } 
      )

      

  }

  onPlus() {
    this.quantity = this.quantity + 1;
  }

  onMinus() {
    this.quantity = this.quantity - 1;
  }

  onAddtoCart(item:any) {

    if(!this.removeItemMode) {

      const userData: any = localStorage.getItem('userData');
      const userDataParse = JSON.parse(userData);
  
      if(userDataParse) {
        
        const routeUrl = this.router.url;
  
        const prodId = routeUrl.substring(9,routeUrl.length)
  
        this.cartData = {
          ...item, 
          userId : userDataParse.id,
          userEmail : userDataParse.email,
          quantity : this.quantity,
          productId : prodId
        }  
        // console.log(prodId);
        // console.log(this.cartData);
  
        const cartDetails = this.cartService.onAddToCart(this.cartData);
  
        // console.log(cartDetails);
  
      }
  
      else {
          let options = {
            title: 'Please login first to add an item in your cart',
            confirmLabel: 'Login',
            declineLabel: 'Cancel'
          }
      
          this.confirmDialog.confirm(options).then((res: boolean) => {
            if(res) {
              // console.log('Okay');
              this.router.navigate(['/login']);
            }
            else {
              // console.log('Cancel');
            }
          });
      }
    }

    if(this.removeItemMode)
    
      this.cartService.onRemoveToCart(this.cartId).subscribe(
        (res) => {
          // console.log(res);
          this.cartService.onGetCart();
          this.removeItemMode = false;
          this.toastr.success('', 'item deleted from cart');
        }
      )

      
    }

  // onRemoveCart() {

  //   this.cartService.onRemoveToCart(this.cartId).subscribe(
  //     (res) => {
  //       console.log(res);
  //       this.cartService.onGetCart();
  //       this.removeItemMode = false;
  //       this.toastr.success('', 'item deleted from cart');
  //     }
  //   )
    
  // }

}





