import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/appServices/product.service';
import { productAdding } from './add-product.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AdminNotificationService } from 'src/app/appServices/admin-notification.service';
import { adminNotification } from '../admin-notification/admin-notification.model';
import { map } from 'rxjs';


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

  productData !: productAdding;

  adminDtata !: adminNotification;

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

  productId: string = '';

  productingArray: any;

  editMode: boolean = false;

  productArray !: productAdding;

  addedProductId : string = '';

  addedProductTitle : string = '';

  constructor(
    public prodService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private adminNoti: AdminNotificationService
  ) {}

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

    this.activeRoute.queryParams.subscribe(params => {
      const proId = params['id'];
      
      if(proId) {
        this.editMode = true;
        this.productId = proId;
          // console.log(params['id']); 
        this.prodService.getSingleData(proId).subscribe(
          (res) => {
            const data = res;
            this.productingArray = data;
            // console.log(this.productingArray);
            this.addProduct.patchValue({
              productimage : '',
              title : this.productingArray.title,
              price : this.productingArray.price,
              category : this.productingArray.category,
              hasdiscount : this.productingArray.hasdiscount,
              discoujntpercentage : this.productingArray.discoujntpercentage,
              size : this.productingArray.size,
              desone : this.productingArray.desone,
              destwo : this.productingArray.destwo,
              desthree : this.productingArray.desthree,
              desfour : this.productingArray.desfour,
            });
  
          }
        )
      }

      else {
        this.editMode = false;
      }

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

      if(this.editMode) {
        this.loader = true;
        this.prodService.onProductEdit(this.productId, this.productData).subscribe(
          (res) => {
            this.router.navigate(['/admin/products']);
            this.loader = false;
            this.editMode = false;
            this.toastr.success('', 'You have updated product successfully!');
          }
        );
      }

      else {
        // console.log(this.addProduct.value);
        this.loader = true;
        this.prodService.onAddProduct(this.productData).subscribe(
          (result:any) => {
            // console.log(res);
            // console.log(res.name);
            
            const getTitle = '';

            this.loader = false;
            this.toastr.success('', 'You have added product successfully!');

            this.addedProductId = result.name;

            this.prodService.getSingleData(result.name).subscribe(
              (res) => {
                console.log(res.title);
                console.log(res);
                this.addedProductTitle = res.title;

                this.adminDtata = {
                  msg : 'product has been added successfully.',
                  productTitle: this.addedProductTitle,
                  productId: this.addedProductId
                }
    
                this.adminNoti.onCreateAdminNotification(this.adminDtata).subscribe((res) => {
                  // console.log(res);
                });
  
                this.router.navigate(['/admin/products']);

              }
            );

          }
        );
      }

    // console.log(this.productData);

    }
    else {
      this.submitted=true;
      this.toastr.error('', 'Please fill in the form to add product!', {
        timeOut: 4000,
        progressBar: true,
        progressAnimation: 'increasing',
      });

    }
  }

  onApplyPercentage() {
    let priceValue = this.addProduct.value.price;
    let discountValue = this.addProduct.value.discoujntpercentage;
    const newPrice = priceValue * (discountValue/100);

    this.addProduct.patchValue({
      price : newPrice
    });
  }

  // onEditingProduct() {
  //   this.addProduct.setValue({
  //     name: this.userArray[i].name,
  //     technology: this.userArray[i].technology
  //   });
  // }

  // gettingSingleData(res: any) {

    // console.log(res.productimage)
    // this.addProduct.patchValue({
    //   category: res.category,
    //   productimage: res.productimage
    // })

    // this.addProduct.setValue({
    //   productimage : res.productimage,
    //   title : res.title,
    //   price : res.price,
    //   category : res.category,
    //   hasdiscount : res.hasdiscount,
    //   discoujntpercentage : res.discoujntpercentage,
    //   size : res.size,
    //   desone : res.desone,
    //   destwo : res.destwo,
    //   desthree : res.desthree,
    //   desfour : res.desfour,

    // });
  // }

}
