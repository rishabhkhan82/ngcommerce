import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/appServices/product.service';
import { productAdding } from './add-product.model';
import { Router } from '@angular/router';

interface Categories {
  value: string;
}

interface HasDiscount {
  value: string;
}

interface Size {
  value: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {

  loader: boolean = false;

  addProduct !: FormGroup;

  productData !: any;

  submitted: boolean = false;

  category : Categories[] = [
    {value: 'jeans'},
    {value: 't-shirt'},
    {value: 'blazzer'}
  ];

  hasdiscount : HasDiscount[] = [
    {value: 'Has Discount'},
    {value: 'No Discount'},
  ];

  sizeArray : string[] = [
    'sm',
    'md',
    'lg',
    'xl'
  ];

  constructor(public prodService: ProductService,private router: Router) {

  }

  ngOnInit() {
    this.addProduct = new FormGroup({
      productimage : new FormControl(null, Validators.required),
      title : new FormControl(null, Validators.required),
      price : new FormControl(null, Validators.required),
      category : new FormControl([], Validators.required),
      hasdiscount : new FormControl(['Has Discount']),
      discoujntpercentage : new FormControl(null),
      size : new FormArray([], Validators.required),
      desone : new FormControl(null, Validators.required),
      destwo : new FormControl(null, Validators.required),
      desthree : new FormControl(null, Validators.required),
      desfour : new FormControl(null, Validators.required),
    });
    
  }

  onChangeSize(e:any) {
    // console.log(e.target.value);
    const checkedValue = e.target.value;
    const checked = e.target.checked;
    // console.log(checkedValue, checked);
    const checkedArray = this.addProduct.get('size') as FormArray;
    if(checked) {
      checkedArray.push(new FormControl(checkedValue));
    }
    else {
      let i: number = 0;
      checkedArray.controls.forEach((item) => {
        if(item.value == checkedValue) {
          checkedArray.removeAt(i);
        }
        i++;
      });
    }

  }

  onChangeDiscount(e:any) {
    // console.log(e.target.value);
    if(e.target.value == 'No Discount') {
      this.addProduct.controls['discoujntpercentage'].disable();
    }
    else {
      this.addProduct.controls['discoujntpercentage'].enable();
    }
  }

  onAddProduct() {

    this.productData = this.addProduct.value;
    // console.log(this.productData);

    // if(this.productData.valid) {
    //   console.log(this.productData)
    // }
    // else {
    //   console.log('complete the form');
    // }

    if(this.addProduct.valid){
      // console.log(this.addProduct.value);
      this.loader = true;
      this.prodService.onAddProduct(this.productData).subscribe(
        (res) => {
          // console.log(res);
          this.loader = false;
          this.router.navigate(['/admin']);
          
        }
      );

    // console.log(this.productData);

    }
    else {
      this.submitted=true;
    }
  }





}
