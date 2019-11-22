import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [UserdashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
     { path:'userdashboard/:userId',component:UserdashboardComponent}
    ])
  ]
})
export class UserModule { }
