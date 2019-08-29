import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {HttpErrorResponse} from "@angular/common/http";
import {PermissionCheckerService} from "../utils/permissionCheckerService";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loggedInUser: string;
  userHasBugManagementPermission: boolean;


  constructor(private router: Router, private cookieService: CookieService, private permissionChecker: PermissionCheckerService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.loggedInUser = this.cookieService.get("username");
    this.checkIfUserHasBugManagementPermission();
  }

  logout() {
    console.log('You ve been logout');
    this.router.navigate(['/login']);
  }

  checkIfUserHasBugManagementPermission() {
    this.permissionChecker.checkIfUserHasPermission(this.loggedInUser, 'BUG_MANAGEMENT').subscribe(
      (obj) => {
        this.userHasBugManagementPermission = obj;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.toastrService.error(error.message);
      }
    );
    return false;
  }

}
