// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { map, Observable, take } from 'rxjs';
// import { AuthenticateService } from './authenticate.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(
//     private authService:AuthenticateService,
//     private router: Router
//   ) {
//   }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

//     return this.authService.User.pipe(
//       take(1),
//       map(
//         (user:any) => {
//           if(user) {
//             return true;
//           }
//           else {
//             return this.router.createUrlTree(['login']);
//           }
//         }
//       )
//     )
//   }
// }
