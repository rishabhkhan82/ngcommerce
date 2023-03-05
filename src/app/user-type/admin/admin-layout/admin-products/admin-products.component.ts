import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/appServices/product.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit{

  productArray : any = [];

  constructor(
    private productServi: ProductService,
  ) {

  }

  ngOnInit() {
    this.onFetchUsers();
  }

  onFetchUsers() {
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
      console.log(this.productArray)
    })
  }

}
