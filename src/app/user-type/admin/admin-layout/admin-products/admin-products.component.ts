import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/appServices/product.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { adminNotification } from '../admin-notification/admin-notification.model';
import { AdminNotificationService } from 'src/app/appServices/admin-notification.service';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit{

  productArray : any = [];

  generateFake : any = [
    {},
    {},
    {},
    {}
  ];

  dataloading: boolean = true;

  adminDtata !: adminNotification;

  addedProductId : string = '';

  addedProductTitle : string = '';

  constructor(
    private productServi: ProductService,
    private router: Router,
    private adminNoti: AdminNotificationService
  ) {

  }

  ngOnInit() {
    this.onFetchProducts();
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
      this.productArray = JSON.parse(dataTwo);
      // console.log(this.productArray);
      this.dataloading = false;
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

        this.adminDtata = {
          msg : 'product has been deleted successfully.',
          productTitle: this.addedProductTitle,
          productId: this.addedProductId
        }

        this.adminNoti.onCreateAdminNotification(this.adminDtata).subscribe((res) => {
          console.log(res);
        });

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
