import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { RouterModule } from '@angular/router';
import { CalendarModule,DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// import { momentAdapterFactory } from '../app.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { MeetingViewComponent } from './meeting-view/meeting-view.component';
import { UserRouteguardService } from './user-routeguard.service';

@NgModule({
  declarations: [UserdashboardComponent, MeetingViewComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    RouterModule.forChild([
     { path:'userdashboard/:userId',component:UserdashboardComponent,canActivate:[UserRouteguardService]},
     {path:'usermeetingview/:meetingId',component:MeetingViewComponent,canActivate:[UserRouteguardService]}
    ])
  ],
  providers:[UserRouteguardService]
})
export class UserModule { }
