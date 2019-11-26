import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

export class SocketService {

  public baseUrl: string;
  public socket: any;
  constructor() {
    this.baseUrl = 'http://13.233.44.251:4001';
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
    return Observable.create((observer) => {

      this.socket.on(userId, (data) => {

        observer.next(data)
      })
    })

  }
  //get create notify code end

  //add edit notify code start
  public emitUpdateNotification = (data) => {

    this.socket.emit('Update-Meeting', data);
  }
  //add edit notify code end


  //get edit code start
  public listenToEditNotification = (userId) => {

    console.log(userId);
    return Observable.create((observer) => {

      this.socket.on(userId, (data) => {
        observer.next(data)
      })
    })

  }
  //get edit code end


  //add edit notify code start
  public emitDeleteNotification = (data) => {
    this.socket.emit('Delete-Meeting', data);
  }
  //add edit notify code end


  //get delete code start
  public listenToDeleteNotification = (userId) => {

    return Observable.create((observer) => {
      this.socket.on(userId, (data) => {
        observer.next(data)
      })
    })

  }
  //get delete code end


}
