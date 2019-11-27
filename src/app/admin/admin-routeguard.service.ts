import { Injectable } from '@angular/core';

import {Cookie} from 'ng2-cookies';
import{CanActivate,Router,ActivatedRouteSnapshot} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminRouteguardService implements CanActivate {
  
  constructor(private router:Router) { }

  canActivate( route :ActivatedRouteSnapshot):boolean {

    console.log('in admin route guard service');

    if(Cookie.get('authToken')== undefined || Cookie.get('authToken')==''||Cookie.get('authToken')==null){

      this.router.navigate(['/']);

      return false;

    }
    else{
      return true;
    }
  }
 
}