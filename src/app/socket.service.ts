import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

export class SocketService {
 public baseUrl: string;
public socket: any;
  constructor() { 
    this.baseUrl='http://13.233.44.251:4001';
    this.socket=io(this.baseUrl);
  }


        //verify and setuser code is called
        public verifyUser:any=()=>{
          let ak=Observable.create((observer)=>
          {
            this.socket.on('verifyUser',(data)=>{
              observer.next(data);
            }) 
          }) 
           return ak;
          } 
          public setUser=(userId)=>{
            this.socket.emit('set-user',userId);
          }
          //verify and setuser code is end
  
             //onlineuserlist code strat 
        public onlineUserList=()=>{
          let ak=Observable.create((observer)=>{
            this.socket.on('online-user-list',(result)=>{
              observer.next(result)
            })
          })
          return ak;
        }
         //onlineuserlist code end
  
      
         //disconnected code start
         public disconnectedSocket=()=>{
          let ak=Observable.create((observer)=>{
            this.socket.emit("disconnect",()=>{
              observer.next();
            })
          })
          return ak;
        }
        //disconnected code end
  
        
        //exit socket code start
       public exitsocket=()=>{
        this.socket.disconnect();
       }
        //exit socket code end
  
        
      //add edit notify code start
      public addeditnotify=(data)=>{
        this.socket.emit('Edit-Event',data);
       }
      //add edit notify code end
      

        //get edit code start
        public geteditnotify=(userId)=>{
          let ak=Observable.create((observer)=>{
            this.socket.on(userId,(data)=>{
              observer.next(data)
            })
          })
          return ak;
         }
        //get edit code end


      //add edit notify code start
      public adddeletenotify=(data)=>{
        this.socket.emit('Delete-Event',data);
       }
      //add edit notify code end


      //get delete code start
      public getdeletenotify=(userId)=>{
        let ak=Observable.create((observer)=>{
          this.socket.on(userId,(data)=>{
            observer.next(data)
          })
        })
        return ak;
       }
      //get delete code end

      

      //add create notify code start
      public addcreatenotify=(data)=>{
        this.socket.emit('Create-Event',data);
       }
      //add craete notify code end


      
      //get create notify code start
      public getcreatenotify=(userId)=>{
        let ak=Observable.create((observer)=>{
          this.socket.on(userId,(data)=>{
            observer.next(data)
          })
        })
        return ak;
       }
      //get create notify code end
}
