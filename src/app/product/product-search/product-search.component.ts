import { Component, OnInit, ViewChildren } from '@angular/core';
import { ProductService } from 'src/app/appServices/product.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  proListArray : any = [];

  nameSearch: any = '';

  serchPlace : any = 'name';

  searchType: any = 'name';

  resultArray: number = this.proListArray.length;

  @ViewChildren('searchLength') filteredItems:any;

  

  constructor(
    public productServi: ProductService,
  ) {

  }

  ngOnInit() {
    this.onFetchUsers();
  }

  onFetchUsers() {
    this.productServi.onGetProduct().pipe(map((resData: any) => {
      const userArrayTwo: any = [];
      for(const id in resData) {
        if(resData.hasOwnProperty(id)) {
          userArrayTwo.push({
            userId: id, ...resData[id]
          });
        }
      }
      return userArrayTwo
    })).subscribe((res) => {
      const dataTwo = JSON.stringify(res);
      this.proListArray = JSON.parse(dataTwo);
      console.log(this.proListArray)
    })
  }

  onChangeSearchType(e:any) {
    if(e.target.value == 'name') {
      this.serchPlace = 'name';
    }
    else {
      this.serchPlace = 'category';
    }
  }

}
