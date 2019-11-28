import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  public baseurl = 'http://localhost:3000/api/v1/users';
  public authToken = Cookie.get('authToken');


  constructor(public http: HttpClient) { }

  public getUserInfoFromLocalstorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));

  } // end getUserInfoFromLocalstorage


  public setUserInfoInLocalStorage = (data) => {

    localStorage.setItem('userInfo', JSON.stringify(data))

  }

    //signup code start
    public signupfunction = (data): any => {

      let params = new HttpParams()
        .set("firstName", data.firstName)
        .set("lastName", data.lastName)
        .set('userName', data.userName)
        .set("countryCode", data.countryCode)
        .set("mobileNumber", data.mobileNumber)
        .set("email", data.email)
        .set("password", data.password)
  
  
      return this.http.post(`${this.baseurl}/signup`, params);
  
    }
    //signup code end
  
    //signin code start
    public signinfunction = (data): any => {
      let params = new HttpParams()
        .set('email', data.email)
        .set('password', data.password)
      return this.http.post(`${this.baseurl}/signin`, params);
  
    }
    //signin code start
  
    //sendcode start
    public sendResetToken = (email): any => {
      let params = new HttpParams()
        .set('email', email)
      return this.http.post(`${this.baseurl}/forgotPassword`, params);
  
    }
    //sendcode end
  
    //resetpassword code start
    public resetPassword = (data): any => {
      let params = new HttpParams()
        .set('password', data.password)
        .set('resetPasswordToken', data.resetPasswordToken)
      return this.http.post(`${this.baseurl}/resetPassword`, params);
  
    }
    //resetpassword code end
  
    //get all Users code start
    public getAllUsers = (authToken): any => {
  
      return this.http.get(`${this.baseurl}/view/all?authToken=${authToken}`);
      // return this.http.get(`${this.baseurl}/api/v1/users/view/all?authToken=${authToken}`);
      
    }
    //get all Users code end
  
    // get single user details
  
    public getSingleUser =(userId,authToken):any =>{
  
      return this.http.get(`${this.baseurl}/${userId}/details?authToken=${this.authToken}`);
  
    }
  
    //end get single user details
  
  
    /* **************************************************************************************** */
  



}
