import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MeetingHttpService } from 'src/app/meeting-http.service';

import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
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
import { SocketService } from 'src/app/socket.service';
import { EventEmitter } from 'events';


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
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminDashComponent implements OnInit {

  public userId: any;
  public userName:string;
  public adminName: string;
  public p: Number = 1;
  public count: Number = 5;
  public view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
 
  events:Array<CalendarEvent>=[];
  meetings:any;
  activeDayIsOpen: boolean = true;
  start: string;
  end: string;
  nomeeting: any;
  event: any;
  public authToken: string;
  
  // modalData: {
  //   action: string;
  //   event: CalendarEvent;
  // };

  


  
  constructor(public socketService: SocketService,
    public toastr: ToastrService,
    public service: MeetingHttpService,
    public router: Router,
    public _route: ActivatedRoute,
    private modal: NgbModal) 
    {
        this.dateOrViewChanged()
        
  }

  ngOnInit() {
    this.userId = this._route.snapshot.paramMap.get('userId');
        this.adminName = Cookie.get('userName');
        this.authToken = Cookie.get('authToken');
        this.getSingleUser();
        this.getAllMeetingsByUser();
  }
  
 
  dayClicked({ date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
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

    // handleEvent(action: string, event: CalendarEvent): void {
    //   this.modalData = { event, action };
    //   this.modal.open(this.modalContent, { size: 'lg' });
    // }

    //get all event code start
    public getAllMeetingsByUser=()=>{
        
      this.service.getAllMeetingsByUser(this.userId,this.authToken).subscribe( data => {
        this.event=data.data;
        if(this.event==null){
              this.nomeeting=0;
        }
        else {
          this.nomeeting=1;
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
    

    public getSingleUser=()=>{

      this.service.getSingleUser(this.userId,this.authToken).subscribe(
        
      result=>{

        let resobj= result['data'];
        this.userName=resobj.firstName+''+resobj.lastName;
      }),
      err=>{
        this.toastr.error('some error occured')
      }


    }


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
