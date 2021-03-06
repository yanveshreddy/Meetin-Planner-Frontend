import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { UserRegistrationModule } from './user-registration/user-registration.module';

import { SigninComponent} from './user-registration/signin/signin.component'
import { UserModule } from './user/user.module';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { MeetingHttpService } from './meeting-http.service';
import { SocketService } from './socket.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserHttpService } from './user-http.service';

export function momentAdapterFactory() {
  return adapterFactory(moment);
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      timeOut: 5000
    }),
    UserRegistrationModule,
    AdminModule,
    UserModule,
    RouterModule.forRoot([
      {path:'signin',component:SigninComponent,pathMatch:'full'},
      {path:'',redirectTo:'signin',pathMatch:'full'},
      {path:"*",component:SigninComponent},
      {path:"**",component:SigninComponent},
    ]),
  
  ],
  providers: [UserHttpService,MeetingHttpService,SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
