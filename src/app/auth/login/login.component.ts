import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthErrorService } from 'src/app/appServices/auth-error.service';
import { AuthService } from 'src/app/appServices/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;
  loader: boolean = false;
  submitted: boolean = false;
  error: string = '';
  errText = this.errService.errorMsg;

  isLogin : boolean = false;
  userRole: string = '';

  constructor(
    public auth : AuthService,
    private toastr: ToastrService,
    private errService: AuthErrorService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    if(this.auth.user) {
     
    }
    
    this.auth.user.subscribe((res) => {
      if(res) {
        if(res.id === 'IhXXaaDWdNSRhcBHZNPKunfHomd2') {
          this.userRole = 'admin';
          this.router.navigate(['/admin']);
          // this.toastr.error('', "You are all ready login");
        }
        else {
          this.userRole = 'user';
          this.router.navigate(['/user']);
          // this.toastr.error('', "You are all ready login");
        }
      }
      else {
        this.userRole = '';
      }
    });

  }

  onLoginUser() {
    if(this.loginForm.valid) {
      this.loader = true;
      console.log(this.loginForm.value);
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.auth.onLogin(email,password).subscribe(
        (res) => {
          this.loader = false;
          console.log(res);
          // this.router.navigate(['/admin/products']);
          this.auth.user.subscribe(
            (res:any) => {
                if(res.id === 'IhXXaaDWdNSRhcBHZNPKunfHomd2') {
                  // this.router.navigate(['/admin']);
                  window.location.href = '/admin';
                }
                else {
                  // this.router.navigate(['/user']);
                  window.location.href = '/user';
                }
              }
            )
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
      )
    }
    else {
      this.submitted = true;
    }
  }
}
