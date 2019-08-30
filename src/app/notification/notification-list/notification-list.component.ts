import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SendNotificationsService } from 'src/app/service/send-notifications.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  cols: any[];
  selectedNotification: Notification;
  notifications: Notification[];

  constructor(private notificationService: NotificationService, private cookieService: CookieService, private router: Router) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'type', header: 'Type', width: '90px'},
      {field: 'message', header: 'Message', width: '120px'},
      {field: 'date', header: 'Date', width: '120px'},
      {field: 'url', header: 'Url', width: '270px'}
    ];

    this.getAllNotifications();

    console.log(this.notifications);
    // this.goToBug(1);

  }

  onRowSelect(event){
    if(event.data.url !== undefined){
      console.log(event.data.url.split("http://localhost:4200/dashboard/bugs?bugId=")[1]);
      let id = event.data.url.split("http://localhost:4200/dashboard/bugs?bugId=")[1];
      this.goToBug(id);
    }
  }



  getAllNotifications() {
    this.notificationService.getAllNotificationsForUser(this.cookieService.get("username")).subscribe(
      (notificationList) => {
        this.notifications = notificationList;
      }
    );

  }

  goToBug(id: number) {
    this.router.navigate(['/dashboard/bugs'], { queryParams: { bugId: id } });
  }

}
