import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { AuthErrorService } from 'src/app/appServices/auth-error.service';
import { AuthService } from 'src/app/appServices/auth.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  emailValue = JSON.parse(localStorage.getItem('userData') || '{}'); 

  userArray : any = [];

  limitUserArray : boolean = true;

  userArrayLength: any;

  @Output() userLengthToParent = new EventEmitter<string>();

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private authError: AuthErrorService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.onGetUsers();
    console.log(this.router.url)

    if(this.router.url === '/admin/users') {
      this.limitUserArray = false;
    }

  }

  onGetUsers() {
    this.auth.onGetAddedDataBaseUser().subscribe((res) => {
      this.userArrayLength = res.length;
      const dataToDisplay = res?.slice(0, 4);

      if(this.limitUserArray) {
        this.userArray = dataToDisplay;
      }

      else {
        this.userArray = res;
      }

    })
  }

}
