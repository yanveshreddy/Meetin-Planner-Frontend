import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class MeetingHttpService {

  constructor(public http: HttpClient) {

  }

  public baseurl = 'http://localhost:3000/api/v1/meetings';
  public authToken = Cookie.get('authToken');

  //create meeting code start
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
      .set('adminUserName', data.adminName)
      .set('authToken', data.authToken)

    return this.http.post(`${this.baseurl}/createMeeting?authToken=${this.authToken}`, params);
    
  }
  //create meeting code is end


  //get getAllMeetingsByUser code start
  public getAllMeetingsByUser = (userId, authToken): any => {
    
    return this.http.get(`${this.baseurl}/${userId}/getAllMeetingsByUser?authToken=${authToken}`);
  
  }
  //get getAllMeetingsByUser code end


  //get single meeting code start
  public getSingleMeeting = (meetingId, authToken): any => {
    console.log(this.authToken)
  
    return this.http.get(`${this.baseurl}/${meetingId}/getSingleMeeting?authToken=${authToken}`);
    
  }
  //get single meeting code end


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
      .set('adminUserName', data.adminName)
      .set('purpose', data.purpose)
      .set('location', data.location)
      
    return this.http.put(`${this.baseurl}/${data.meetingId}/updateMeeting?authToken=${authToken}`, params);
    
  }
  //update Meeting code end


  //delete Meeting code start
  public deleteMeeting = (meetingId, authToken): any => {
    let params=new HttpParams()
    .set('meetingId',meetingId)
    .set('authToken',authToken)
   
    return this.http.post(`${this.baseurl}/${meetingId}/deleteMeeting?authToken=${authToken}`,params);
    
  }
  //delete Meeting code end

}
