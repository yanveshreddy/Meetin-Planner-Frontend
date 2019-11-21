import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MeetingHttpService } from 'src/app/meeting-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  public signuploader: boolean;
  public email: any;
  public resetPasswordToken: any;
  public password: any;
  public signinloader: boolean;
  constructor(public toastr: ToastrService, public service: MeetingHttpService, public router: Router) { }

  ngOnInit() {
  }
  //send code is start
  public sendToken = () => {
    if (!this.email) {
      this.toastr.warning('Enter Your Email');
    }
    else {
      this.signuploader = false;
      this.service.sendResetToken(this.email).subscribe(
        data => {
          this.signuploader = true;
          this.toastr.success(data.message);
        },
        err => {
          this.signuploader = true;
          this.toastr.error('some error occured');
        }
      )
    }
  }
  //send code is end

  //resetpassword code start
  public resetpassword = () => {
    if (!this.resetPasswordToken) {
      this.toastr.warning('Enter Your resetCode');
    }
    else if (!this.password) {
      this.toastr.warning('Enter Your password');
    }
    else {
      this.signinloader = false;
      let data = {
        password: this.password,
        resetPasswordToken: this.resetPasswordToken
      }
      this.service.resetpassword(data).subscribe(
        data => {
          this.signinloader = true;
          this.toastr.success(data.message);
        },
        err => {
          this.signinloader = true;
          this.toastr.error('some error occured');
        }
      )
    }
  }
  //resetpassword code end
}
