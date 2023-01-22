import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthenticateService } from "./authenticate.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private _AuthService: AuthenticateService
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

       return this._AuthService.User.pipe(
            take(1),
            exhaustMap((user : any) => {

                if(!user) {
                    return next.handle(req);
                }

                const modReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                })

                return next.handle(modReq);

            })
        )
    }
}