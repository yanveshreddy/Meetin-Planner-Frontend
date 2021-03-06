import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { UpdateMeetingComponent } from './update-meeting/update-meeting.component';

import {NgxPaginationModule} from 'ngx-pagination';

import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AdminRouteguardService } from './admin-routeguard.service';



@NgModule({
  declarations: [AdminDashComponent, AdminHomeComponent, CreateMeetingComponent, UpdateMeetingComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModalModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild ([

      {path:'adminhome',component:AdminHomeComponent,canActivate:[AdminRouteguardService]},
      {path:'admindashboard/:userId',component:AdminDashComponent,canActivate:[AdminRouteguardService]},
      {path:'createmeeting/:userId',component:CreateMeetingComponent,canActivate:[AdminRouteguardService]},
      {path:'updatemeeting/:meetingId',component:UpdateMeetingComponent,canActivate:[AdminRouteguardService]}
      // {path:'createevent/:userId',component:AdminCreateEventComponent},
      // {path:'editevent/:eventId',component:AdminEditEventComponent}
     ])
  ],
  providers:[AdminRouteguardService]
})
export class AdminModule { }
