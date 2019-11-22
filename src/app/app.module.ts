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
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';

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
    ToastrModule.forRoot({
      timeOut: 1000
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
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
