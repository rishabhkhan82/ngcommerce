import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { firebaseConfig } from '../app-config';
import { AuthResponse } from '../appInterface/auth-response.interface';
import { User } from '../auth/user.auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User | null>(null);

  constructor(
    public http : HttpClient
  ) { 
  }

  onRegister(email: any, password: any) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(err => {
        return err;
      }),
      tap(
        (res:any) => {
          this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn);
        })
    )
  }

  onLogin(email: any, password: any) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(err => {
        return err;
      }),
      tap(
        (res:any) => {
          this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn);
        })
    )
    
  }

  autoLogin()  {
    const userData: any = localStorage.getItem('userData');
    const userDataParse = JSON.parse(userData);
    console.log(userDataParse);


    if(!userDataParse) {
      return;
    }

    const loggedInUser = new User(userDataParse.email, userDataParse.id, userDataParse._token, new Date(userDataParse._tokenExpirationDate));

    if(loggedInUser.token) {
      this.user.next(loggedInUser)
    }

  }

  private authenticatedUser(email:any, userId: any, token: any, expiresIn: any): void {

    const expirationDate = new Date(new Date().getTime() + expiresIn*1000);

    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);

    localStorage.setItem('userData', JSON.stringify(user));

    console.log('user =>', user);

  }


}
