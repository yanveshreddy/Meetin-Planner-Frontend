import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AdminDashComponent],
  imports: [
    CommonModule,
    RouterModule.forChild ([
      {path:'admindashboard',component:AdminDashComponent},
      // {path:'createevent/:userId',component:AdminCreateEventComponent},
      // {path:'editevent/:eventId',component:AdminEditEventComponent}
     ])
  ]
})
export class AdminModule { }
