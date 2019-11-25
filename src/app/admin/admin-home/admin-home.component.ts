import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { MeetingHttpService } from 'src/app/meeting-http.service';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/socket.service';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  // providers:[SocketService]
})
export class AdminHomeComponent implements OnInit {
  public adminName: string;
  public username: any;
  public p: Number = 1;
  public count: Number = 10;
  public userId: string;
  public authToken: string;

  constructor(public toastr: ToastrService,public service:MeetingHttpService,public router: Router,public socketService:SocketService) { }

  ngOnInit() {
    this.authToken=Cookie.get('authToken');
    this.adminName=Cookie.get('userName');
    this.userId=Cookie.get('userId');
    this.getAllUsers();
    this.verifyUser();
    this.getonlineUsers();
  }
   
  //verify user code start
  public verifyUser=()=>{
    this.socketService.verifyUser().subscribe(
      data=>{
        this.socketService.setUser(this.userId);
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
    },
    err=>{
      this.toastr.error('some error occured')
    }
  )
}
//get online users code end



  //get all users code start
   public getAllUsers=()=>{
     this.service.getAllUsers(this.authToken).subscribe(
       data=>{
         this.username=data.data;
       }
     )
   }
  //get all users code end

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

