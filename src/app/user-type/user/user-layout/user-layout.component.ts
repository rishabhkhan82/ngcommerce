import { Component } from '@angular/core';
import { AuthService } from 'src/app/appServices/auth.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent {

  singleUserDetails : any = {}

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
    this.auth.userProfile.subscribe(
      (res) => {
        this.singleUserDetails = res;
        // console.log(this.singleUserDetails)
      }
    )
  }

  onLogout() {
    this.auth.onLogout();
  }

}
