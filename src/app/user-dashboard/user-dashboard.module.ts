import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashComponent } from './user-dash/user-dash.component';
import { UserMeetingsComponent } from './user-meetings/user-meetings.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [UserDashComponent, UserMeetingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'userdashboard/:userId',component:UserDashComponent},
      {path:'usermeetings/:userId',component:UserMeetingsComponent}
    ])
  ]
})
export class UserDashboardModule { }
