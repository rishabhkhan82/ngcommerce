import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/appServices/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm !: FormGroup;

  submitted: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
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
      console.log(this.forgotForm.value)
      this.auth.forgotPassword(this.forgotForm.value.email).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err)
        }
      )
    }
    else {
      this.submitted = true;
    }
  }
}
