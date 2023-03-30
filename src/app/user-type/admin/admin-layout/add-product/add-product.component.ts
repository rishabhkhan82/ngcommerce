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
import { AuthErrorService } from 'src/app/appServices/auth-error.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { getStorage, ref, deleteObject } from "firebase/storage";

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

  error: string = '';

  errText = this.errService.errorMsg;

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

  // for storng image starte here

  imageLoading : boolean = false;


  path: string = '';
  uploadPercent!: Observable<number | undefined>;
  downloadURL!: Observable<string | undefined>;

  constructor(
    public prodService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private adminNoti: AdminNotificationService,
    private errService: AuthErrorService,
    private storage: AngularFireStorage

  ) {}

  ngOnInit() {
    this.addProduct = new FormGroup({
      productimage : new FormControl(null),
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
      productUrl: new FormControl('', Validators.required)

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
              productUrl: this.productingArray.productUrl
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
          }, 
          (err) => {
            this.loader = false;
            console.log(err);
            
            if(!err.error || !err.error.error) {
              this.error = this.errText['UNKNOWN'];
              this.toastr.error('', this.error);
            }

            else {
              this.error = this.errText[err.error.error.message];
              this.toastr.error('', this.error);
            }
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

          }, 
          (err) => {
            this.loader = false;
            console.log(err);
            
            if(!err.error || !err.error.error) {
              this.error = this.errText['UNKNOWN'];
              this.toastr.error('', this.error);
            }

            else {
              this.error = this.errText[err.error.error.message];
              this.toastr.error('', this.error);
            }
          }
        );
      }

    // console.log(this.productData);

    }
    else {
      this.submitted=true;
      this.toastr.error('', "Please fill in the form's required field to add product!", {
        timeOut: 4000,
        progressBar: true,
        progressAnimation: 'increasing',
      });

    }
  }

  onApplyPercentage() {
    let priceValue = this.addProduct.value.price;
    let discountValue = this.addProduct.value.discoujntpercentage;
    const newPrice = priceValue - ((discountValue/100) * priceValue);
    // alert(priceValue);
    // alert(discountValue);
    // alert((100 * priceValue) / discountValue)

    this.addProduct.patchValue({
      price : newPrice
    });
  }

  upload(event: any, url : any) {
    this.path = event.target.files[0];
    
    console.log(event);

    this.imageLoading = true;

    this.uploadImage();

    this.deleteImage(url);

}

  uploadImage() {
    // console.log(this.path);

    const file = this.path;
    const filePath = '/files'+Math.random();
    const fileRef = this.storage.ref(filePath);

    const task = this.storage.upload(filePath, file);
    
     // observe percentage changes
     this.uploadPercent = task.percentageChanges();
     // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {  
        this.downloadURL = fileRef.getDownloadURL(); 
        // console.log(this.downloadURL.subscribe());

        this.storage.ref(filePath).getDownloadURL().subscribe(
            (res) => {
                this.downloadURL = res;
                console.log(this.downloadURL);

                // this.adminProfile.patchValue({
                //     profileImage: this.downloadURL
                // });

                this.addProduct.patchValue({
                  productUrl: this.downloadURL
                });

                // this.onAddProduct();


                this.imageLoading = false;

                console.log(this.addProduct.value);

            }
        )


    })).subscribe(
        (res) => {
            
        }
    );

    

  }

  deleteImage(url:any) {

    const storage = getStorage();

    const file = this.path;
    const filePath = '/files'+Math.random();
    const fileRef = this.storage.ref(filePath);

    // Create a reference to the file to delete
    const desertRef = ref(storage, url);

    // Delete the file
    deleteObject(desertRef).then(() => {
    // File deleted successfully
    }).catch((error) => {
    // Uh-oh, an error occurred!
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
