import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthErrorService {

  constructor() { }

  errorMsg : any = {
    EMAIL_EXISTS: 'This email is already exist.',
    OPERATION_NOT_ALLOWED: 'This operation is not allowed',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'Two many attempts, Please try again later',
    EMAIL_NOT_FOUND: 'This email is not found.',
    INVALID_PASSWORD: 'Wrong Password.',
    USER_DISABLED: 'You are disable to login',
    UNKNOWN: 'Unknown error.',
    INVALID_ID_TOKEN : 'Your credential is no longer valid',
    USER_NOT_FOUND : 'No user found with this details'
  }
  
}
