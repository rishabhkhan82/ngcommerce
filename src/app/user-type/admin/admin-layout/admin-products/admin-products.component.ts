import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/appServices/product.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';



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

  constructor(
    private productServi: ProductService,
    private router: Router
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
      console.log(this.productArray);
      this.dataloading = false;
    })
  }

  onDeletingProduct(prod: any) {
    if(confirm("Are you sure to delete this product")) {
      console.log(prod);
      this.productServi.onDeleteProduct(prod).subscribe((res) => {
        // console.log(res)
        this.onFetchProducts();
      })
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
