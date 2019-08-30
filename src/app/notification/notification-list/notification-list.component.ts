import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../notification.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  cols: any[];
  selectedNotification: Notification;
  notifications: Notification[];

  constructor(private notificationService: NotificationService, private cookieService: CookieService) {
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


  }

  getAllNotifications() {
    this.notificationService.getAllNotificationsForUser(this.cookieService.get("username")).subscribe(
      (notificationList) => {
        this.notifications = notificationList;
      }
    );

  }

}
