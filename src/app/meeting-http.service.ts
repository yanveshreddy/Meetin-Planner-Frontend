import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class MeetingHttpService {
  // public baseurl: string;
  // public authToken: any;

  constructor(public http: HttpClient) {

  }

  public baseurl = 'http://localhost:3000';
  public authToken = Cookie.get('authToken');

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


    return this.http.post(`${this.baseurl}/api/v1/users/signup`, params);

  }
  //signup code end

  //signin code start
  public signinfunction = (data): any => {
    let params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password)
    return this.http.post(`${this.baseurl}/api/v1/users/signin`, params);

  }
  //signin code start

  //sendcode start
  public sendResetToken = (email): any => {
    let params = new HttpParams()
      .set('email', email)
    return this.http.post(`${this.baseurl}/api/v1/users/forgotPassword`, params);

  }
  //sendcode end

  //resetpassword code start
  public resetPassword = (data): any => {
    let params = new HttpParams()
      .set('password', data.password)
      .set('resetPasswordToken', data.resetPasswordToken)
    return this.http.post(`${this.baseurl}/api/v1/users/resetPassword`, params);

  }
  //resetpassword code end

  //get all Users code start
  public getAllUsers = (authToken): any => {

    return this.http.get(`${this.baseurl}/api/v1/users/view/all?authToken=${authToken}`);
    
  }
  //get all Users code end

  /* **************************************************************************************** */

  //create event code is start
  public createMeeting = (data): any => {
    let params = new HttpParams()
      .set('title', data.title)
      .set('purpose', data.purpose)
      .set('location', data.location)
      .set('color', data.color)
      .set('start', data.start)
      .set('startHour', data.startHour)
      .set('startMinute', data.startMinute)
      .set('end', data.end)
      .set('endHour', data.endHour)
      .set('endMinute', data.endMinute)
      .set('userId', data.userId)
      .set('adminId', data.adminId)
      .set('adminName', data.adminName)
     
     
      .set('authToken', data.authToken)

    return this.http.post(`${this.baseurl}/api/v1/meetings/createMeeting`, params);
    
  }
  //create event code is end


  //get getAllMeetingsByUser code start
  public getAllMeetingsByUser = (userId, authToken): any => {
    
    return this.http.get(`${this.baseurl}/api/v1/meetings/${userId}/getAllMeetingsByUser?authToken=${authToken}`);
    
  }
  //get getAllMeetingsByUser code end


  //get singleevent code start
  public getSingleMeeting = (meetingId, authToken): any => {
    console.log(this.authToken)
  
    return this.http.get(`${this.baseurl}/api/v1/meetings/${meetingId}/getSingleMeeting?authToken=${authToken}`);
    
  }
  //get singleevent code end


  //update Meeting code start
  public updateMeeting = (data, authToken): any => {

    let params = new HttpParams()
      .set('title', data.title)
      .set('start', data.start)
      .set('startHour', data.startHour)
      .set('startMinute', data.startMinute)
      .set('end', data.end)
      .set('endHour', data.endHour)
      .set('endMinute', data.endMinute)
      .set('creatorId', data.creatorId)
      .set('creatorName', data.creatorName)
      .set('userId', data.userId)
      .set('color', data.color)
      .set('adminId', data.adminId)
      .set('adminName', data.adminName)
      .set('purpose', data.purpose)
      .set('location', data.location)
      
    return this.http.put(`${this.baseurl}/api/v1/meetings/${data.meetingId}/updateMeeting?authToken=${authToken}`, params);
    
  }
  //update Meeting code end


  //delete Meeting code start
  public deleteMeeting = (meetingId, authToken): any => {
    let params=new HttpParams()
    .set('eventId',meetingId)
    .set('authToken',authToken)
   
    return this.http.post(`${this.baseurl}/api/v1/meetings/${meetingId}/deleteMeeting?authToken=${authToken}`,params);
    
  }
  //delete Meeting code end


  //send create meeting mail notify code start
  public sendCreateMailNotification = (data): any => {
    let params = new HttpParams()
      .set('userId', data.userId)
      .set('title', data.title)
      .set('start', data.start)
      .set('end', data.end)
    return this.http.post(`${this.baseurl}/sendCreateMail`, params);
    
  }
  //end create meeting mail notify code end


  //send edit event mail notify code start
  public sendUpdateMailNotification = (data): any => {
    console.log(data)
    let params = new HttpParams()
      .set('userId', data.userId)
      .set('title', data.title)
      .set('adminName', data.adminName)
    return this.http.post(`${this.baseurl}/sendEditMail`, params);
    
  }
  //end edit event mail notify code end



  //send delete event mail notify code start
  public sendDeleteMailnotification = (data): any => {
    let params = new HttpParams()
      .set('userId', data.userId)
      .set('title', data.title)
      .set('adminName', data.adminName)
    return this.http.post(`${this.baseurl}/sendDeleteMail`, params);
  
  }
  //end delete event mail notify code end

}
