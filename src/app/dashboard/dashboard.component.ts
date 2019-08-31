import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {HttpErrorResponse} from "@angular/common/http";
import {PermissionCheckerService} from "../utils/permissionCheckerService";
import {ToastrService} from "ngx-toastr";
import { SendNotificationsService } from '../service/send-notifications.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loggedInUser: string;
  userHasBugManagementPermission: boolean;
  unreadNotifications: number;


  constructor(private router: Router, private cookieService: CookieService, private permissionChecker: PermissionCheckerService,
              private toastrService: ToastrService, private sendNotificationsService: SendNotificationsService) {  
  }

  ngOnInit() {
    this.loggedInUser = this.cookieService.get("username");
    this.checkIfUserHasBugManagementPermission();
    this.unreadNotifications = 0;

    this.sendNotificationsService.messages.subscribe(msg => {
      if(msg.type === 'SENT'){
        this.unreadNotifications++;
        console.log("Response is: " + msg.type + this.unreadNotifications);
        this.toastrService.success(msg.text).onTap.subscribe(() =>{
          this.router.navigate(['/dashboard/notifications']);
        })
      }
      else if(msg.type === 'READ'){
        this.unreadNotifications = 0;
      }
    });    
  }

  logout() {
    console.log('You ve been logout');
    this.router.navigate(['/login']);
  }

  checkIfUserHasBugManagementPermission() {
    this.permissionChecker.checkIfUserHasPermission(this.loggedInUser, 'BUG_MANAGEMENT').subscribe(
      (obj) => {
        this.userHasBugManagementPermission = JSON.parse(obj);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.toastrService.error(error.message);
      }
    );
    return false;
  }

}
