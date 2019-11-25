import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { MeetingHttpService } from 'src/app/meeting-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDatepickerConfig, NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from 'src/app/socket.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-update-meeting',
  templateUrl: './update-meeting.component.html',
  styleUrls: ['./update-meeting.component.css'],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    NgbDatepickerConfig
  ]
})
export class UpdateMeetingComponent implements OnInit {

  public eventId: string;
  public title: any;
  public startTime: { hour: any; minute: any; };
  public endTime: { hour: any; minute: any; };
  public userId: any;
  public event: any;
  public adminName: any;
  public signuploader: boolean;
  public authToken: string;

  constructor(public socketService:SocketService,public toastr: ToastrService,public service:MeetingHttpService,public router:Router,public _route:ActivatedRoute,private config:NgbDatepickerConfig) {
    this.eventId =this._route.snapshot.paramMap.get('eventId');
    this.adminName=Cookie.get('userName');
    this.authToken=Cookie.get('authToken');
    //configuring Datepicker
    const currentDate = new Date();

    config.minDate = { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate() };
    config.maxDate = { year: currentDate.getFullYear(), month: 12, day: 31 };
    config.outsideDays = 'hidden';
   
    this.getSingleMeeting();
   }

  ngOnInit() {
    
  }
  

  //get event code start
  public getSingleMeeting=()=>{
    this.service.getSingleMeeting(this.eventId,this.authToken).subscribe(
      data=>{
        let x=data['data']
        x.start=new Date(x.start)
        x.end=new Date(x.end);
        this.startTime={hour:x.startHour,minute:x.startMinute}
        this.endTime={hour:x.endHour,minute:x.endMinute}
        this.userId=x.userId
        this.title=x.title
        this.adminName=x.adminName
        this.event = data['data'];
      },
      err=>{
        this.toastr.error('some error occured')
      }
    )
  }
  //get event code end


  //edit code is start
  public updateMeeting=()=>{
    this.signuploader=false;
    this.event.startHour=this.startTime.hour
    this.event.startMinute=this.startTime.minute

   this.event.endHour=this.endTime.hour
   this.event.endMinute=this.endTime.minute

   this.service.updateMeeting(this.event,this.authToken).subscribe(
     data=>{
      this.signuploader=true;
      this.router.navigate(['/admindashboard',this.userId]);
      this.toastr.success(data.message);
      let details={
        adminName:this.adminName,
        userId:this.userId,
        eventId:this.eventId
    }
      this.socketService.addeditnotify(details);
      this.updateMeetingMailNotification();
     },
     err=>{
      this.signuploader=true;
       this.toastr.error('some error occured');
     }
   )
  }
  //edit code is end


  //delete code is start
 public deleteMeeting=()=>{
   
   this.service.deleteMeeting(this.eventId,this.authToken).subscribe(
     
     data=>{
      this.router.navigate(['/admindashboard',this.userId]);
       this.toastr.success(data.message);
       let details={
        adminName:this.adminName,
        userId:this.userId,
        eventId:this.eventId
    }
      this.socketService.adddeletenotify(details);
       this.deleteMeetingMailNotification();
     },
     err=>{
       this.toastr.error('some error occured');
     }
   )
 }
  //delete code is end
   
  //start send email notify
  public updateMeetingMailNotification=()=>{
 
    let data={
      userId:this.userId,
      title:this.title,
      adminName:this.adminName
    }
    this.service.sendUpdateMailNotification(data).subscribe(
      data=>{
        
      },
      err=>{
        this.toastr.error('some error occured');
      }
    )
 }
//end send email notify



//start send email notify
public deleteMeetingMailNotification=()=>{
  let data={
    userId:this.userId,
    title:this.title,
    adminName:this.adminName
  }
  this.service.sendDeleteMailnotification(data).subscribe(
    data=>{
      
    },
    err=>{
      this.toastr.error('some error occured');
    }
  )
}
//end send email notify


//logout code start
public logout=()=>{
  this.socketService.exitsocket();
  this.socketService.disconnectedSocket();
  Cookie.delete('authToken');
  Cookie.delete('userId');
  Cookie.delete('userName');
  this.toastr.success('logout successfully');
  setTimeout(() => {
    this.router.navigate(['/signin']);
  },1000);
}
 //logout code end
}
