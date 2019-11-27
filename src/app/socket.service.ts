import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

@Injectable()
export class SocketService {

  public baseUrl: string;
  public socket: any;

  constructor( public toastr:ToastrService) {
    this.baseUrl = 'http://localhost:3000';
   
    this.socket = io(this.baseUrl);
  }


  //verify and setuser code is called
  public verifyUser: any = () => {

    return Observable.create((observer) => {
      this.socket.on('verifyUser', (data) => {
        observer.next(data);
      })
    })
    
  }
  public setUser = (userId) => {

    this.socket.emit('set-user', userId);

  }
  //verify and setuser code is end

  //onlineuserlist code strat 
  public onlineUserList = () => {
    return Observable.create((observer) => {
      this.socket.on('online-user-list', (result) => {
        observer.next(result)
      })
    })
   
  }
  //onlineuserlist code end


  //disconnected code start
  public disconnectedSocket = () => {

    return Observable.create((observer) => {

      this.socket.emit("disconnect", () => {
        observer.next();
      })
    })

  }
  //disconnected code end


  //exit socket code start
  public exitsocket = () => {

    this.socket.disconnect();

  }
  //exit socket code end
  //add create notify code start
  public emitCreateNotification = (data) => {

    this.socket.emit('Create-Meeting', data);

  }
  //add craete notify code end



  //get create notify code start
  public listenToCreateNotification = (userId) => {

      this.socket.on(`${userId} create`, (data) => {
        console.log(data);
        this.toastr.show(`${data.adminName} scheduled new meeting with title:${data.title}`);
      
      })
    

  }
  //get create notify code end

  //add edit notify code start
  public emitUpdateNotification = (data) => {
    //console.log(data);
    this.socket.emit('Update-Meeting', data);
  }
  //add edit notify code end


  //get edit code start
  public listenToEditNotification = (userId) => {

      this.socket.on(`${userId} update`, (data) => {
        console.log(data);
        this.toastr.show(`${data.adminName} updated your meeting with title:${data.title}`)
      })
    

  }
  //get edit code end

  public listenToAlarmNotification =(userId) =>{

    this.socket.on('alarm', (data) => {
      console.log(data);
      this.toastr.warning(`your meeting ${data.title} created by ${data.adminName} will begin in ${data.minutes}`);

    })

  }

  //add edit notify code start
  public emitDeleteNotification = (data) => {
    this.socket.emit('Delete-Meeting', data);
  }
  //add edit notify code end


  //get delete code start
  public listenToDeleteNotification = (userId) => {

      this.socket.on(`${userId} delete`, (data) => {
        console.log(data);
        this.toastr.show(`${data.adminName} terminated your meeting with meetingId:${data.meetingId}`)
        
      })
  

  }
  //get delete code end


}
