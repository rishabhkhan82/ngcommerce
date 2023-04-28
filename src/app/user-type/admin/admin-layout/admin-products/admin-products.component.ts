import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/appServices/product.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { adminNotification } from '../admin-notification/admin-notification.model';
import { AdminNotificationService } from 'src/app/appServices/admin-notification.service';
import { AuthErrorService } from 'src/app/appServices/auth-error.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/appServices/common.service';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit{

  productArray : any = [];

  generateFake : any = [];

  dataloading: boolean = true;

  adminDtata !: adminNotification;

  addedProductId : string = '';

  addedProductTitle : string = '';

  error: string = '';

  errText = this.errService.errorMsg;

  constructor(
    private productServi: ProductService,
    private router: Router,
    private adminNoti: AdminNotificationService,
    private errService: AuthErrorService,
    private toastr: ToastrService,
    private genFake: CommonService
  ) {

  }

  ngOnInit() {
    this.onFetchProducts();
    this.generateFake = this.genFake.generateFake(4);
  }

  onFetchProducts() {
    this.productServi.onGetProduct().pipe(map((resData: any) => {
      // console.log(resData);
      const userArrayTwo: any = [];
      for(const id in resData) {
        // console.log(id);
        // console.log(resData[id])
        if(resData.hasOwnProperty(id)) {
          userArrayTwo.push({
            userId: id, ...resData[id]
          });
        }
      }
      return userArrayTwo
    })).subscribe((res) => {
      const dataTwo = JSON.stringify(res);
      this.productArray = JSON.parse(dataTwo).reverse();
      // console.log(this.productArray);
      this.dataloading = false;
    },
    (err) => {
      this.dataloading = false;

      console.log(err);
      
      if(!err.error || !err.error.error) {
        this.error = this.errText['UNKNOWN'];
        this.toastr.error('', this.error);
      }

      else {
        this.error = this.errText[err.error.error.message];
        this.toastr.error('', this.error);
      }

    })
  }

  onDeletingProduct(prod: any, title : any) {
    if(confirm("Are you sure to delete this product")) {
      console.log(prod);
      this.productServi.onDeleteProduct(prod).subscribe((res) => {

        // console.log(res)
        this.onFetchProducts();

        this.addedProductId = prod;

        this.addedProductTitle = title;

        this.toastr.success('', 'Product has been deleted successfully');

        this.adminDtata = {
          msg : 'product has been deleted successfully.',
          productTitle: this.addedProductTitle,
          productId: this.addedProductId
        }

        this.adminNoti.onCreateAdminNotification(this.adminDtata).subscribe((res) => {
          console.log(res);
        });

      }, 
      (err) => {
        this.dataloading = false;

        console.log(err);
        
        if(!err.error || !err.error.error) {
          this.error = this.errText['UNKNOWN'];
          this.toastr.error('', this.error);
        }

        else {
          this.error = this.errText[err.error.error.message];
          this.toastr.error('', this.error);
        }

      });
    }

  }

  onGetSingleData(id:any) {
    this.productServi.getSingleData(id);
  }

  onEditProduct(id:any, ind: any) {
    this.router.navigate(['/admin/add-product'],
    { queryParams: { id: id, edit: 'true' } });
  }

}
