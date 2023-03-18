import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthErrorService } from 'src/app/appServices/auth-error.service';
import { AuthService } from 'src/app/appServices/auth.service';

@Component({
    selector: 'app-admin-profile',
    templateUrl: './admin-profile.component.html',
    styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

    adminProfile !: FormGroup;

    submitted: boolean = false;

    emailValue = JSON.parse(localStorage.getItem('userData') || '{}'); 

    constructor(
        private toastr: ToastrService,
        private auth: AuthService,
        private authError: AuthErrorService
    ) {

    }

    ngOnInit() {

        this.adminProfile = new FormGroup({
            profileImage : new FormControl('', Validators.required),
            name : new FormControl('', Validators.required),
            email : new FormControl(this.emailValue.email)
        });

      this.adminProfile.controls['email'].disable();

      this.auth.userProfile.subscribe(
        (res) => {
            this.adminProfile.patchValue({
                name : res.displayName,
                profileImage: res.photoUrl
            })
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
            // console.log(this.adminProfile.value);
            
            this.auth.updateProfile(newObject).subscribe(
                (res:any) => {
                    console.log(res);
                    this.toastr.success('', 'Your profile has updated');
                    this.auth.getProfile(this.emailValue._token);
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

}
