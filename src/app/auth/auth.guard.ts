import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../appServices/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.user.pipe(
      take(1),
      map(
        (user:any) => {
          if(user) {
            return true;
          }
          else {
            this.toastr.error('','Please login to continue');
            return this.router.createUrlTree(['login']);
          }
        }
      )
    )
  }
}
