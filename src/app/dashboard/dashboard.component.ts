import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {HttpErrorResponse} from "@angular/common/http";
import {PermissionCheckerService} from "../utils/permissionCheckerService";
import {ToastrService} from "ngx-toastr";
import {SendNotificationsService} from '../service/send-notifications.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loggedInUser: string;
  userHasBugManagementPermission: boolean;
  unreadNotifications: number;
  userHasUserManagementPermission: boolean;

  constructor(private router: Router, private cookieService: CookieService, private permissionChecker: PermissionCheckerService,
              private toastrService: ToastrService, private sendNotificationsService: SendNotificationsService) {  
  }

  ngOnInit() {
    this.loggedInUser = this.cookieService.get("username");
    this.checkIfUserHasManagementPermission('BUG_MANAGEMENT');
    this.checkIfUserHasManagementPermission('USER_MANAGEMENT');
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

  checkIfUserHasManagementPermission(permission: string) {
    this.permissionChecker.checkIfUserHasPermission(this.loggedInUser, permission).subscribe(
      (obj) => {
        if (permission === 'BUG_MANAGEMENT') {
          this.userHasBugManagementPermission = JSON.parse(obj);
        } else {
          this.userHasUserManagementPermission = JSON.parse(obj);
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.toastrService.error("Internal error.");
      }
    );
    return false;
  }


}
