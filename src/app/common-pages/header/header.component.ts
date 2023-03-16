import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/appServices/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

   show:boolean = true;

   isLoggedIn: boolean = false;

   constructor(
    public auth: AuthService,
    private toastr: ToastrService,
    private router: Router
   ) {

   }

   ngOnInit() {
    this.show = false;

    this.auth.user.subscribe((res) => {
      if(res) {
        this.isLoggedIn = true;
      }
      else {
        this.isLoggedIn = false;
      }
    })
   }

   onToggle() {
    this.show = !this.show;
   }

   onLogOut() {
      this.auth.onLogout();
      this.toastr.success('', 'You have logout successfully!');
   }

}
