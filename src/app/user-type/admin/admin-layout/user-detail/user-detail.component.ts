import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthErrorService } from 'src/app/appServices/auth-error.service';
import { AuthService } from 'src/app/appServices/auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  emailValue = JSON.parse(localStorage.getItem('userData') || '{}'); 

  userArray : any = {};

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private authError: AuthErrorService
  ) {

  }

  ngOnInit() {

    // this.auth.getProfile(this.emailValue._token).subscribe(
    //   (res) => {
    //     console.log(res);
    //     // console.log(res.users.email);
    //     // this.userArray = res.;
    //   },
    //   (err) => {
    //     console.log(err);
    //     const data = this.authError.errorMsg;

    //     this.toastr.error('', this.authError.errorMsg[err.error.error.message]);
    //   }
    // );

  }


}
