import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/appServices/product.service';

@Component({
  selector: 'app-product-individual',
  templateUrl: './product-individual.component.html',
  styleUrls: ['./product-individual.component.css']
})
export class ProductIndividualComponent {

  constructor(private activeRoute: ActivatedRoute, private du: ProductService) {

  }  

  dynamicId: any;
  loader:boolean=true;
  item: any= [];
  sizeArray: any = [];
  

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(
      (param:any) => {
        // console.log(param.get('userId'));
        this.dynamicId = param.get('userId');
        // console.log(this.dynamicId);
        this.du.getSingleData(this.dynamicId).subscribe(
          (res) => {
            console.log(res);
            this.loader=false;
            this.item = res;
            this.sizeArray = this.item.size;
          }
        );
        // this.name = this.item.name;
        // this.tech = this.item.technology;

      });

  }

}
