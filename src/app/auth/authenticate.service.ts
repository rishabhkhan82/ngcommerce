import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, retry, Subject, tap } from 'rxjs';
import { config } from './app-config';
import { AuthErrorService } from './auth-error.service';
import { AuthResponseInterface } from './auth.response.interface';
import { User } from './user.auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  User = new BehaviorSubject<User | null>(null);

  private tokenExpireTimer: any;

  constructor(
      private http: HttpClient,
      private _errServi: AuthErrorService,
      private router: Router,
    ) { 
    // this.autoSignIn();
  }

  onRegister(email:any, password: any) {
    return this.http.post<AuthResponseInterface>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(
        err => {
          return this._errServi.handleError(err);
        }
      ),
      tap(
        (res:any) => {
          this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn)
        }
      )
    )
  }

  onLogin(email:any, password: any) {
    return this.http.post<AuthResponseInterface>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(
        err => {
          return this._errServi.handleError(err);
        }
      ),
      tap(
        (res:any) => {
          this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn)
        }
      )
    )
  }

  autoSignIn() {
    const loggedDataFromLocal: any = localStorage.getItem('loggedInUserData');
    const loggedDataParse = JSON.parse(loggedDataFromLocal);
    console.log(loggedDataParse);

    if(!loggedDataParse) {
      return;
    }

    const loggedInUser = new User(loggedDataParse.email, loggedDataParse.id, loggedDataParse._token, new Date(loggedDataParse._tokenExpirationDate))
  
    if(loggedInUser.token) {
      this.User.next(loggedInUser);
      
      const expDuration = new Date(loggedDataParse._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expDuration);
    }
  
  }

  logOut() {
    this.User.next(null)
    this.router.navigate(['']);
    localStorage.removeItem('loggedInUserData')

    if(this.tokenExpireTimer) {
      clearTimeout(this.tokenExpireTimer)
    }

    this.tokenExpireTimer = null;

  }

  autoLogOut(expireDuration:number) {
    this.tokenExpireTimer = setTimeout(() => {
      this.logOut();  
    }, expireDuration)
  }

  changePassword(data:any) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${config.API_KEY}`, {
        idToken: data.idToken,
        password: data.password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(
        (err:any) => {
          return this._errServi.handleError(err);
        }
      )
    )
  }

  resetPassword(email:any) {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${config.API_KEY}`, {
      requestType: 'PASSWORD_RESET',
      email: email
    }).pipe(
      catchError(
        (err:any) => {
          return this._errServi.handleError(err);
        }
      )
    )
  }

  googleSingIn(idtoken:any) {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${config.API_KEY}`, {
      postBody: `id_token=${idtoken}&providerId=google.com`,
      requestUri:'http://localhost:4200/',
      returnIdpCredential:true,
      returnSecureToken:true
    }).pipe(
      catchError(
        err => {
          return this._errServi.handleError(err);
        }
      ),
      tap(
        (res:any) => {
          this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn)
        }
      )
    )
  }
  
  private authenticatedUser(email:any, userId:any, token:any, expiresIn:any) {
    const expireDate = new Date(new Date().getTime() + expiresIn*1000);
    const user = new User(email, userId, token, expireDate);
    console.log('User =>', user);
    this.User.next(user) // storing data in User subject
    this.autoLogOut(expiresIn*1000);
    localStorage.setItem('loggedInUserData', JSON.stringify(user));
  }
}
