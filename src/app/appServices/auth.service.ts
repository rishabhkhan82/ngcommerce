import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { firebaseConfig } from '../app-config';
import { AuthResponse } from '../appInterface/auth-response.interface';
import { User } from '../auth/user.auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User | null>(null);

  userProfile = new BehaviorSubject<any | null>({
    displayName: '',
    email: '',
    photoUrl: ''
  });

  tokenExpiTimer: any;

  constructor(
    public http : HttpClient,
    public router: Router
  ) { 
  }

  onRegister(email: any, password: any) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
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
      this.user.next(loggedInUser);

      const expireDuration = new Date(userDataParse._tokenExpirationDate).getTime() - new Date().getTime();

      this.autoLogout(expireDuration);
      this.getProfile(loggedInUser.token);

    }

  }

  onLogout() {
    this.user.next(null);
    this.router.navigate(['']);
    localStorage.removeItem('userData');

    if(this.tokenExpiTimer) {
      clearTimeout(this.tokenExpiTimer);
    }
    this.tokenExpiTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpiTimer = setTimeout(() => {
      this.onLogout();
    }, expirationDuration);
  }

  updateProfile(data: any) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${firebaseConfig.apiKey}`, {
      idToken: data.token,
      displayName: data.name,
      photoUrl: data.profileImage
    });
  }

  getProfile(data:any) {

    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConfig.apiKey}`, {
      idToken: data
    }).subscribe(
      (res:any) => {
          
        this.userProfile.next(
          {
            displayName: res.users[0].displayName,
            email: res.users[0].email,
            photoUrl: res.users[0].photoUrl
          }
        );

      }
    )

  }

  private authenticatedUser(email:any, userId: any, token: any, expiresIn: any): void {

    const expirationDate = new Date(new Date().getTime() + expiresIn*1000);

    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);

    this.autoLogout(expiresIn*1000);

    localStorage.setItem('userData', JSON.stringify(user));

    // console.log('user =>', user);




  }




}
