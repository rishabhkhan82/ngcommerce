import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthErrorService } from 'src/app/appServices/auth-error.service';
import { AuthService } from 'src/app/appServices/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userRegister !: FormGroup;

  submitted: boolean = false;

  error: string = '';

  errText = this.errService.errorMsg;

  constructor(
    public auth : AuthService,
    private toastr: ToastrService,
    private errService: AuthErrorService
  ) {

  }

  ngOnInit() {
    this.userRegister = new FormGroup({
      email : new FormControl(null, Validators.required),
      password : new FormControl(null, Validators.required)
    });
  }

  onUserRegister() {

    if(this.userRegister.valid) {
      // console.log(this.userRegister.value);
      const email = this.userRegister.value.email;
      const password = this.userRegister.value.password;
      this.auth.onRegister(email, password).subscribe(
        (res) => {
          console.log(res);
          this.toastr.success('', 'You have registered successfully!');
        },
        (err) => {
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
