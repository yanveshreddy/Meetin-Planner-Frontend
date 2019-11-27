//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MeetingHttpService } from 'src/app/meeting-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { SocketService } from 'src/app/socket.service';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarMonthViewBeforeRenderEvent
} from 'angular-calendar';
import {
  ViewEncapsulation
} from '@angular/core';
import { CalendarMonthViewDay } from 'angular-calendar';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {
  subMonths,
  addMonths,
  addWeeks,
  subWeeks,
  startOfMonth,
  startOfWeek,
  endOfWeek,
} from 'date-fns';

//import { SocketService } from 'src/app/socket.service';


type CalendarPeriod = 'day' | 'week' | 'month';

function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths
  }[period](date, amount);
}

function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth
  }[period](date);
}

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css'],
  providers:[SocketService]
})
export class UserdashboardComponent implements OnInit {

  public userId: string;
  public events: CalendarEvent[] = [];
  public start: any;
  public end: any;
  public p: Number = 1;
  public count: Number = 5;
  public userName: String;
  public html;
  public date = new Date().getMinutes()
  public month;
  public day;
  public a = 11;
  // public username: string;
  public userList: any = [];

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
 

  activeDayIsOpen: boolean = true;
  public event: any;
  public meetings:any;
  public noevent: number;
  public authToken: string;
  

  
  constructor(public socketService:SocketService,public toastr: ToastrService,public service:MeetingHttpService,public _route: ActivatedRoute, public router: Router, private modal: NgbModal) {
    this.dateOrViewChanged();
    this.userName=Cookie.get('userName');
    this.userId=Cookie.get('userId');
    this.authToken=Cookie.get('authToken');
   }

  ngOnInit() {
    this.userId=this._route.snapshot.paramMap.get('userId');
    this.getAllMeetingsByUser();
    this.verifyUser();
    this.getonlineUsers();
    this.geteditnotifiation();
    this.getdeletenotifiation();
    this.getcreatenotifiation();
  }


      //get all event code start
      public getAllMeetingsByUser=()=>{
        
        this.service.getAllMeetingsByUser(this.userId,this.authToken).subscribe( data => {
          this.event=data.data;
          if(this.event==null){
                this.noevent=0;
          }
          else {
            this.noevent=1;
            for(let x of data['data']){
              x.start=startOfDay(new Date(x.start))
              x.start.setHours(x.startHour,x.startMinute)
              x.end=endOfDay(new Date(x.end))
              x.end.setHours(x.endHour,x.endMinute)
                x.color={primary:x.color}
                var startdate = new Date(x.start),
                month = ("0" + (startdate.getMonth() + 1)).slice(-2),
                day = ("0" + startdate.getDate()).slice(-2);
             this.start=[day, month,startdate.getFullYear()].join("-");
        
             var enddate = new Date(x.end),
             month = ("0" + (enddate.getMonth() + 1)).slice(-2),
             day = ("0" + enddate.getDate()).slice(-2);
          this.end=[day, month,enddate.getFullYear()].join("-");
              }
              this.events =data['data'] ;
              this.meetings=data['data'];
        
          }
    
        })
      }  
      //get all event code end
  
    

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

    minDate: Date = subMonths(new Date(),new Date().getMonth());
  
    maxDate: Date = addMonths(new Date(),12-new Date().getMonth());
  
    prevBtnDisabled: boolean = false;
  
    nextBtnDisabled: boolean = false;
  
   
    increment(): void {
      this.changeDate(addPeriod(this.view, this.viewDate, 1));
    }
  
    decrement(): void {
      this.changeDate(subPeriod(this.view, this.viewDate, 1));
    }
  
    today(): void {
      this.changeDate(new Date());
    }
  
    dateIsValid(date: Date): boolean {
      return date >= this.minDate && date <= this.maxDate;
    }
  
    changeDate(date: Date): void {
      this.viewDate = date;
      this.dateOrViewChanged();
    }
  
    changeView(view: CalendarView): void {
      this.view = view;
      this.dateOrViewChanged();
    }
  
    dateOrViewChanged(): void {
      this.prevBtnDisabled = !this.dateIsValid(
        endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1))
      );
      this.nextBtnDisabled = !this.dateIsValid(
        startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1))
      );
      if (this.viewDate < this.minDate) {
        this.changeDate(this.minDate);
      } else if (this.viewDate > this.maxDate) {
        this.changeDate(this.maxDate);
      }
    }
    //verify user code start
  public verifyUser=()=>{
    this.socketService.verifyUser().subscribe(
      data=>{
        this.socketService.setUser(this.authToken);
      },
      err=>{
        this.toastr.error('some error occured')
      }
    )
}
//verify user code end


//get online users code start
public getonlineUsers=()=>{
  this.socketService.onlineUserList().subscribe(
    data=>{
      this.userList = [];

        for (let x in data) {

          let temp = { 'userId': x, 'name': data[x], 'unread': 0, 'chatting': false };

          this.userList.push(temp);          

    }
    err=>{
      this.toastr.error('some error occured')
    }
    })
}
//get online users code end


//get editevent notification code start
 public geteditnotifiation=()=>{
   this.socketService.listenToEditNotification(`${this.userId}`);
 }
//get editevent notification code end


//get deleteevent notification code start
public getdeletenotifiation=()=>{
  this.socketService.listenToDeleteNotification(`${this.userId}`);
}
//get editevent notification code end


//get create event notification code start
public getcreatenotifiation=()=>{
  this.socketService.listenToCreateNotification(`${this.userId}`);
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
