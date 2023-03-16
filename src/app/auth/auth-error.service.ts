import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthErrorService {

  constructor() { }

  handleError(err: HttpErrorResponse) {
    if(!err.error) {
      return throwError('UNKNOWN');
    }
    else {
      return throwError(err.error.error.message)
    }
  }

  errorMsg : any = {
    EMAIL_EXISTS: 'This email is already exist.',
    OPERATION_NOT_ALLOWED: 'This operation is not allowed',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'Two many attempts, Please try again later',
    EMAIL_NOT_FOUND: 'This email is not found.',
    INVALID_PASSWORD: 'Wrong Password.',
    USER_DISABLED: 'You are disable to login',
    UNKNOWN: 'Unknown error.'
  }
}
