import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthErrorService } from 'src/app/appServices/auth-error.service';
import { AuthService } from 'src/app/appServices/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm !: FormGroup;

  submitted: boolean = false;

  loader : boolean = false;

  error: string = '';

  errText = this.errService.errorMsg;

  constructor(
    private auth: AuthService,
    private router: Router,
    private errService: AuthErrorService,
    private toastr: ToastrService,

  ) {}

  ngOnInit() {
    this.forgotForm = new FormGroup({
      email: new FormControl('', Validators.required)
    })
    this.auth.user.subscribe(
      (res) => {
        if(res) {
          this.router.navigate(['/admin']);
        }
      }
    )
  }

  onSubmit() {
    if(this.forgotForm.valid) {
      this.loader = true;
      console.log(this.forgotForm.value)
      this.auth.forgotPassword(this.forgotForm.value.email).subscribe(
        (res) => {
          this.loader = false;
          this.toastr.error('', 'Please, check your email to reset password');
          console.log(res);
        },
        (err) => {
          this.loader = false;
          console.log(err);
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
      )
    }
    else {
      this.submitted = true;
    }
  }
}
