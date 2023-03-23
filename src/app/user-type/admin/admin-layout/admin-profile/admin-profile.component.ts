import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthErrorService } from 'src/app/appServices/auth-error.service';
import { AuthService } from 'src/app/appServices/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-admin-profile',
    templateUrl: './admin-profile.component.html',
    styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

    adminProfile !: FormGroup;

    submitted: boolean = false;

    emailValue = JSON.parse(localStorage.getItem('userData') || '{}'); 

    imageLoading : boolean = false;

    path: string = '';
    uploadPercent!: Observable<number | undefined>;
    downloadURL!: Observable<string | undefined>;

    constructor(
        private toastr: ToastrService,
        private auth: AuthService,
        private authError: AuthErrorService,
        private storage: AngularFireStorage
    ) {

    }

    ngOnInit() {

        this.adminProfile = new FormGroup({
            profileImage : new FormControl(''),
            name : new FormControl('', Validators.required),
            email : new FormControl(this.emailValue.email),
            imageUrl : new FormControl('')
        });

      this.adminProfile.controls['email'].disable();

      this.auth.userProfile.subscribe(
        (res) => {
            this.adminProfile.patchValue({
                name : res.displayName,
                imageUrl: res.photoUrl
            });
            console.log(this.adminProfile)
            console.log(res);
        }
      )


    //   console.log(this.emailValue);
    //   console.log(this.emailValue.email);

    }

    onSubmit() {

        // console.log(this.adminProfile)

        if(this.adminProfile.valid) {

            const newObject = {token: this.emailValue._token, ...this.adminProfile.value}
            console.log(newObject);
            console.log(this.adminProfile.value);
            
            this.auth.updateProfile(newObject).subscribe(
                (res:any) => {
                    // console.log(res);
                    this.toastr.success('', 'Your profile has updated');
                    this.auth.getProfile(this.emailValue._token);

                    console.log(res);

                },
                (err) => {
                    console.log(err);
                    this.toastr.error('', this.authError.errorMsg[err.error.error.message]);
                }
            )

        }

        else {
            this.submitted = true;
        }
    }

    onClickEmail() {
        this.toastr.error('', 'This field is disabled')
    }

    upload(event: any) {
        this.path = event.target.files[0];
        
        console.log(event);

        this.imageLoading = true;

        this.uploadImage();

        


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

                    this.adminProfile.patchValue({
                        imageUrl: this.downloadURL
                    });

                    this.imageLoading = false;

                    console.log(this.adminProfile.value);

                }
            )


        })).subscribe(
            (res) => {
            }
        );

        

      }



}
