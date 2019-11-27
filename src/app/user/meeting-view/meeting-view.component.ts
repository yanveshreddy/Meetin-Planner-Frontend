import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MeetingHttpService } from 'src/app/meeting-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { config } from 'process';
import { NgbDatepickerConfig, NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from 'src/app/socket.service';
import { Location } from '@angular/common';
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

  public meetingId: string;
  public startTime: { hour: any; minute: any; };
  public endTime: { hour: any; minute: any; };
  public userId: any;
  public meeting: any;
  public startHour: number;
  public tpace: string;
  public startMinute: any;
  public endHour: number;
  public endMinute: any;
  public start: string;
  public end: string;
  public adminName: any;
  public authToken: string;
  public userName:string;

  constructor(public toastr: ToastrService,
    public service: MeetingHttpService,
    public router: Router,
    public _route: ActivatedRoute,
    private location: Location,
    private modal: NgbModal,
    private config: NgbDatepickerConfig,
    public socketService: SocketService) { }

  ngOnInit() {
    this.meetingId = this._route.snapshot.paramMap.get('meetingId');
    this.authToken = Cookie.get('authToken');
    this.userName =Cookie.get('userName');
    this.getSingleMeeting();
    this.getEditNotifiation();
    this.getDeleteNotifiation();
    this.getCreateNotifiation();
    this.getAlarmNotification();
  }



  //get meeting code start
  public getSingleMeeting = () => {

    this.service.getSingleMeeting(this.meetingId, this.authToken).subscribe(
      data => {
        let meetingObj = data['data']
        meetingObj.start = new Date(meetingObj.start)
        meetingObj.end = new Date(meetingObj.end);
        this.startTime = { hour: meetingObj.startHour, minute: meetingObj.startMinute }
        this.endTime = { hour: meetingObj.endHour, minute: meetingObj.endMinute }
        this.userId = meetingObj.userId
        this.meeting = data['data'];
        if (meetingObj.startHour > 12) { this.startHour = (meetingObj.startHour - 12); this.tpace = "PM" }
        else { this.startHour = meetingObj.startHour; this.tpace = "AM" };
        this.startMinute = meetingObj.startMinute;
        if (meetingObj.endHour > 12) { this.endHour = (meetingObj.endHour - 12); this.tpace = "PM" }
        else if (meetingObj.endHour <= 12) { this.endHour = meetingObj.endHour; this.tpace = "AM" };
        this.endMinute = meetingObj.endMinute;
        var startdate = new Date(meetingObj.start),
          month = ("0" + (startdate.getMonth() + 1)).slice(-2),
          day = ("0" + startdate.getDate()).slice(-2);
        this.start = [day, month, startdate.getFullYear()].join("-");

        var enddate = new Date(meetingObj.end),
          month = ("0" + (enddate.getMonth() + 1)).slice(-2),
          day = ("0" + enddate.getDate()).slice(-2);
        this.end = [day, month, enddate.getFullYear()].join("-");

        this.userId = meetingObj.userId
        this.meeting = data['data'];
      },
      err => {
        this.toastr.error('some error occured')
      }
    )

  }
  //get meeting code end



  //get create meeting notification code start
  public getCreateNotifiation = () => {
    this.socketService.listenToCreateNotification(`${this.userId}`);
  }
  //get create meeting notification code end

  //get editmeeting notification code start
  public getEditNotifiation = () => {
    this.socketService.listenToEditNotification(`${this.userId}`);
  }
  //get editmeeting notification code end


  //get deletemeeting notification code start
  public getDeleteNotifiation = () => {
    this.socketService.listenToDeleteNotification(`${this.userId}`);
  }
  //get editmeeting notification code end

  public getAlarmNotification = () => {
    this.socketService.listenToAlarmNotification(`${this.userId}`);
  }

  public goBack() {
    this.location.back();
  }
  //logout code start
  public logout = () => {

    this.socketService.exitsocket();
    this.socketService.disconnectedSocket();
    Cookie.delete('authToken');
    Cookie.delete('userId');
    Cookie.delete('userName');
    this.toastr.success('logout successfully');
    setTimeout(() => {
      this.router.navigate(['/signin']);
    }, 1000);
  }
  //logout code end

}
