import { Component, OnInit, ViewChildren } from '@angular/core';
import { ProductService } from 'src/app/appServices/product.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  proListArray : any = [];

  searchText: string = '';

  filteredArray : any = [];

  products: any = [];

  properties: any;

  filterLength: any = false;

  selectText : string = 'title';

  constructor(
    public productServi: ProductService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.onFetchUsers();
    this.router.navigate(['/product/search']);
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
      this.filteredArray  = [...this.proListArray];
      console.log(this.proListArray);
      this.filterLength = true;
    })
  }

  selectChange(e:any, inputVal: any) {
    if(e.target.value == 'category') {
      this.selectText = 'category';
    }
    else {
      this.selectText = 'title';
    }
    inputVal.value = '';
    
    this.filteredArray = this.proListArray;
    this.router.navigate(['/product/search']);
  }

filterArray() {
      // No users, empty list.
      if (!this.proListArray.length) {
        this.filteredArray = [];
        return;
      }
  
      // no search text, all users.
      if (!this.searchText) {      
        this.filteredArray = [...this.proListArray]; // keep your usersList immutable
        return;
      }
  
      this.products = [...this.proListArray]; // keep your usersList immutable
      this.properties = Object.keys(this.products[0]); // get user properties
  
      // check all properties for each user and return user if matching to searchText
      this.filteredArray =  this.products.filter((user:any) => {
        
        return this.properties.find((property:any) => {
          const valueString : any = user[property] && user[property].toString().toLowerCase();
            if(property == this.selectText) {
              if(property == 'title') {
                this.router.navigate(['/product/search'], { queryParams: { title: this.searchText }});
              }
              else if (property == 'category') {
                this.router.navigate(['/product/search'], { queryParams: { category: this.searchText }});
              }
              return valueString && valueString.includes(this.searchText.toLowerCase());
            }
        })
        ? user
        : null;
      });
}

}
