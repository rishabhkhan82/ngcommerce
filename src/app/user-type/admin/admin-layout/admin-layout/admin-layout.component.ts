import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/appServices/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  singleUserDetails : any = {}

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
    this.auth.userProfile.subscribe(
      (res) => {
        this.singleUserDetails = res;
        console.log(this.singleUserDetails)
      }
    )
  }

}
