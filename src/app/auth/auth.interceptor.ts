// import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { exhaustMap, Observable, take } from "rxjs";
// import { AuthenticateService } from "./authenticate.service";

import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "../appServices/auth.service";

// @Injectable()

// export class AuthInterceptor implements HttpInterceptor {

//     constructor(
//         private _AuthService: AuthenticateService
//     ) {

//     }

//     intercept(req: HttpRequest<any>, next: HttpHandler) {

//        return this._AuthService.User.pipe(
//             take(1),
//             exhaustMap((user : any) => {

//                 if(!user) {
//                     return next.handle(req);
//                 }

//                 const modReq = req.clone({
//                     params: new HttpParams().set('auth', user.token)
//                 })

//                 return next.handle(modReq);

//             })
//         )
//     }
// }

@Injectable()

export class AuthInterceptor implements HttpInterceptor  {

    constructor(
        private auth : AuthService
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return this.auth.user.pipe(
            take(1),
            exhaustMap(
                (user:any) => {

                    if(!user) {
                        return next.handle(req);
                    }

                    const modifiedRequest = req.clone({
                        params: new HttpParams().set('auth', user.token)
                    })

                    return next.handle(modifiedRequest);
                }
            )
        )
        
    }
}