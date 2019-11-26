import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MeetingHttpService } from 'src/app/meeting-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { config } from 'process';
import { NgbDatepickerConfig, NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-meeting-view',
  templateUrl: './meeting-view.component.html',
  styleUrls: ['./meeting-view.component.css'],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    NgbDatepickerConfig
  ]
})
export class MeetingViewComponent implements OnInit {

  public eventId: string;
  public startTime: { hour: any; minute: any; };
  public endTime: { hour: any; minute: any; };
  public userId: any;
  public event: any;
  public startHour: number;
  public tpace: string;
  public startMinute: any;
  public endHour: number;
  public endMinute: any;
  public start: string;
  public end: string;
  public adminName:any;
  public authToken: string;


  constructor(public toastr: ToastrService,public service:MeetingHttpService,public router: Router,public _route:ActivatedRoute,private modal: NgbModal,private config:NgbDatepickerConfig,public socketService:SocketService) { }

  ngOnInit() {
    this.eventId =this._route.snapshot.paramMap.get('eventId');
    this.authToken=Cookie.get('authToken');
    this.getSingleMeeting();
    this.geteditnotifiation();
    this.getdeletenotifiation();
    this.getcreatenotifiation();
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
        this.event = data['data'];
        if(x.startHour>12){this.startHour=(x.startHour-12);this.tpace="PM"}
        else {this.startHour=x.startHour;this.tpace="AM"};
        this.startMinute=x.startMinute;
        if(x.endHour>12){this.endHour=(x.endHour-12);this.tpace="PM"}
        else if(x.endHour<=12){this.endHour=x.endHour;this.tpace="AM"};
        this.endMinute=x.endMinute;
        var startdate = new Date(x.start),
        month = ("0" + (startdate.getMonth() + 1)).slice(-2),
        day = ("0" + startdate.getDate()).slice(-2);
     this.start=[day, month,startdate.getFullYear()].join("-");
  
     var enddate = new Date(x.end),
     month = ("0" + (enddate.getMonth() + 1)).slice(-2),
     day = ("0" + enddate.getDate()).slice(-2);
  this.end=[day, month,enddate.getFullYear()].join("-");
      
        this.userId=x.userId
        this.event = data['data'];
      },
      err=>{
        this.toastr.error('some error occured')
      }
    )
    
  }
  //get event code end


  //get editevent notification code start
 public geteditnotifiation=()=>{
  this.socketService.listenToEditNotification(`${this.userId} edit`).subscribe(
    data=>{
      this.toastr.success(`${data.adminName} updated your Schedule`);
    }
  )
}
//get editevent notification code end


//get deleteevent notification code start
public getdeletenotifiation=()=>{
  this.socketService.listenToDeleteNotification(`${this.userId} delete`).subscribe(
    data=>{
      this.toastr.success(`${data.adminName} cancelled your Schedule`);
    }
  )
}
//get editevent notification code end


//get create event notification code start
public getcreatenotifiation=()=>{
  this.socketService.listenToCreateNotification(`${this.userId} create`).subscribe(
    data=>{
      this.toastr.success(`${data.adminName} created a schedule`);
    }
  )
}
//get create event notification code end

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
