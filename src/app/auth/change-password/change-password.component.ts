import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/appServices/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm !: FormGroup;

  submitted: boolean = false;

  tokenData: any = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    
    this.changePasswordForm = new FormGroup({
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });

    // this.auth.user.subscribe(
    //   (res) => {
    //     if(res) {
    //       this.router.navigate(['/admin']);
    //     }
    //   }
    // )
  }

  onSubmit() {
    if(this.changePasswordForm.valid) {
      if(this.changePasswordForm.value.newPassword === this.changePasswordForm.value.confirmPassword) {

        this.auth.user.subscribe(
          (res:any) => {
            // console.log(res);
            this.tokenData = res._token
          }
        );

        // console.log(this.changePasswordForm.value);

        const formData = this.changePasswordForm.value;
        
        const newData = {token: this.tokenData, ...{password: this.changePasswordForm.value.confirmPassword}};

        console.log(newData)

        this.auth.changePassword(newData).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        )
      }
      else {
        this.toastr.error('', 'New and confirm password must be same');
      }
    }
    else {
      this.submitted = true;
    }
  }


}
