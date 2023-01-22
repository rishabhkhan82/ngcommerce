import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PreloadingServiceService implements PreloadingStrategy {

  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if(route.data && route.data['preload']) {
      return fn();
    }
    else {
      return of(null);
    }
  }


  constructor() { }
}
function of(arg0: null): Observable<any> {
  throw new Error('Function not implemented.');
}

