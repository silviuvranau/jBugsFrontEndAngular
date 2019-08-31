import {Component, OnInit, ViewChild} from '@angular/core';
import {BugsService} from './bugs.service';
import {Bug, BugToShow, Severity, Status} from '../models/bug.model';
import {SelectItem, SortEvent} from 'primeng/api';
import {User} from '../models/user.model';
import {Table} from 'primeng/table';
import {DatePipe} from '@angular/common';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {PermissionCheckerService} from '../utils/permissionCheckerService';
import {ExcelBugsService} from './excel-bugs.service';
import {TranslateService} from "@ngx-translate/core";
import {Attachment} from "../models/attachment.model";
import {BugAttachmentWrapper} from "../models/bugAttachmentWrapper.model";
import {ActivatedRoute, Router} from '@angular/router';
import {SendNotificationsService} from '../service/send-notifications.service';

var jsPDF = require('jspdf');
require('jspdf-autotable');


@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})
export class BugsComponent implements OnInit {

  displayBugPopUp: boolean;
  loggedInUser: string;
  userHasManagementPermission: boolean;
  userHasBugClosePermission: boolean;
  userHasExportPermission: boolean;
  isStatusFixed: boolean;
  assignedAttachment: string;

  isStatusRejected: boolean;
  users: User[];
  bugs: Bug[];
  attachments: Attachment[];
  bugsToView: BugToShow[];
  popUpBug: BugToShow;
  selectedBug: BugToShow;
  currentBugStatus: Status;

  selectedBugDate = new Date();
  usernamesForFilter: SelectItem[];

  createdByUsernamesForDropDown: SelectItem[];
  cols: any[];
  statusTypes: SelectItem[];
  severityTypes: SelectItem[];

  transitionsFromStatusNew: SelectItem[];
  transitionsFromStatusInProgress: SelectItem[];
  transitionsFromStatusFixed: SelectItem[];
  transitionsFromStatusInfoNeeded: SelectItem[];
  transitionsFromStatusRejected: SelectItem[];
  transitionsFromStatusClosed: SelectItem[];

  @ViewChild('dt', {static: true})
  dt: Table;

  constructor(private bugsService: BugsService, private permissionChecker: PermissionCheckerService, private datePipe: DatePipe, private toastrService: ToastrService,
              private cookieService: CookieService, private excelbugservice: ExcelBugsService, private translateService: TranslateService,
              private route: ActivatedRoute, private router: Router, private sendNotificationsService: SendNotificationsService) {
  }

  ngOnInit() {
    this.loggedInUser = this.cookieService.get('username');
    this.initializeData();
    this.bugsService.getAllUsers().subscribe(obj => {
      this.users = obj;
      this.usernamesForFilter = [
        {label: this.translateService.instant('BDETAILS.ALL'), value: null}
      ];
      this.createUsernameLabels();
    });

    /**
     * Custom function to filter bugs after a given date.
     * @param value
     * @param filter
     */
    this.dt.filterConstraints['dateFilter'] = function inCollection(value: any, filter: any): boolean {
      if (filter === undefined || filter === null || (filter.length === 0 || filter === '') && value === null) {
        return true;
      }
      if (value === undefined || value === null || value.length === 0) {
        return false;
      }
      if (new DatePipe('en').transform(value, 'yyyy-MM-dd') == new DatePipe('en').transform(filter, 'yyyy-MM-dd')) {
        return true;
      }
      return false;
    };

    /**
     * Initialize column header names.
     */
    this.cols = [
      {field: 'title', header: 'Title', width: '120px'},
      {field: 'description', header: 'Description', width: '200px'},
      {field: 'version', header: 'Version', width: '70px'},
      {field: 'targetDate', header: 'Target Date', width: '173px'},
      {field: 'status', header: 'Status', width: '100px'},
      {field: 'fixedVersion', header: 'Fixed Version', width: '70px'},
      {field: 'severity', header: 'Severity', width: '150px'},
      {field: 'createdId', header: 'Created Username', width: '150px'},
      {field: 'assignedId', header: 'Assigned Username', width: '150px'}
    ];


    /**
     * Initializes status types.
     */

    this.statusTypes = [
      {label: 'NEW', value: Status.NEW},
      {label: 'IN_PROGRESS', value: Status.IN_PROGRESS},
      {label: 'FIXED', value: Status.FIXED},
      {label: 'CLOSED', value: Status.CLOSED},
      {label: 'REJECTED', value: Status.REJECTED},
      {label: 'INFO_NEEDED', value: Status.INFO_NEEDED},
    ];

    /**
     * Initializes severity types.
     */
    this.severityTypes = [
      {label: 'LOW', value: Severity.LOW},
      {label: 'MEDIUM', value: Severity.MEDIUM},
      {label: 'HIGH', value: Severity.HIGH},
      {label: 'CRITICAL', value: Severity.CRITICAL},
    ];

    /**
     * Initialize possible status transitions from each status type.
     */
    this.transitionsFromStatusNew = [
      {label: 'NEW', value: Status.NEW},
      {label: 'IN_PROGRESS', value: Status.IN_PROGRESS},
      {label: 'REJECTED', value: Status.REJECTED},
    ];

    this.transitionsFromStatusInProgress = [
      {label: 'IN_PROGRESS', value: Status.IN_PROGRESS},
      {label: 'REJECTED', value: Status.REJECTED},
      {label: 'FIXED', value: Status.FIXED},
    ];

    this.transitionsFromStatusFixed = [
      {label: 'FIXED', value: Status.FIXED},
      {label: 'CLOSED', value: Status.CLOSED},
    ];

    this.transitionsFromStatusInfoNeeded = [
      {label: 'INFO_NEEDED', value: Status.INFO_NEEDED},
      {label: 'IN_PROGRESS', value: Status.IN_PROGRESS},
    ];

    this.transitionsFromStatusRejected = [
      {label: 'REJECTED', value: Status.REJECTED},
      {label: 'CLOSED', value: Status.CLOSED},
    ];

    this.transitionsFromStatusClosed = [
      {label: 'CLOSED', value: Status.CLOSED},
    ];

    this.route.queryParams.subscribe(params => {
      this.selectedBugId = +params['bugId'];
    });

    if(this.selectedBugId !== undefined && this.selectedBugId != NaN){
      let bug: Bug;
      this.getBugById(this.selectedBugId);
      console.log("BUG" + this.openedBug);
    }
  }

  selectedBugId: number;
  openedBug: Bug;

  getBugById(id: number) {
    // let result: Bug;
    this.bugsService.getABug(id).toPromise().then(
      (res: Bug) =>
      {
        console.log(res);
        this.openedBug = res;
        this.attachmentOfBug(this.openedBug);
        this.popUpBug = this.bugToBugToShow(this.openedBug);
        this.displayBugPopUp = true;
      },
      (error) =>
      {
        console.log(error.error);
      }
    )
  }

  
  bugToBugToShow(bug: Bug): BugToShow{
    const bugToView = {} as BugToShow;
    bugToView.id = bug.id;
    bugToView.title = bug.title;
    bugToView.description = bug.description;
    bugToView.version = bug.version;
    bugToView.targetDate = bug.targetDate;
    bugToView.fixedVersion = bug.fixedVersion;
    bugToView.createdId = bug.createdId.username;
    bugToView.status = bug.status;
    bugToView.severity = bug.severity;

    if (bug.assignedId === null) {
      bugToView.assignedId = '';
    } else {
      bugToView.assignedId = bug.assignedId.username;
    }

    return bugToView;
  }


  initializeData() {
    this.bugsService.getAllBugs().subscribe((obj) => {
      this.bugs = obj;
      this.getBugsToView();
      this.checkIfUserHasPermission('BUG_MANAGEMENT');
      this.checkIfUserHasPermission('BUG_CLOSE');
      this.checkIfUserHasPermission('BUG_EXPORT_PDF');
    }, ((error: HttpErrorResponse) => {
      this.toastrService.error("Couldn't load bug table.");
    }));

    this.bugsService.getAllAttachments().subscribe((obj) => {
      this.attachments = obj;
    }, ((error: HttpErrorResponse) => {
      this.toastrService.error("Couldn't load bug attachment.");
    }));
  }

 attachmentOfBug(bug: Bug){
   for(let i = 0; i < this.attachments.length; i++){
     if(this.attachments[i].bug.id === bug.id){
       console.log(this.attachments[i].attContent)
       this.assignedAttachment = this.attachments[i].attContent.substring(9);
     }
   }
   if (this.assignedAttachment === "") {
     this.assignedAttachment = "None"
   }
}

  /**
   * Adds the usernames of users for the filter and edit bug functionality.
   */
  createUsernameLabels() {
    this.createdByUsernamesForDropDown = [
      {label: 'No one', value: null}
    ];
    for (let i = 0; i < this.users.length; i++) {
      this.usernamesForFilter.push({label: this.users[i].username, value: this.users[i].username});
      this.createdByUsernamesForDropDown.push({label: this.users[i].username, value: this.users[i].username});
    }
  }

  /**
   * Method clones the chosen bug (by selection of table row)
   * so it can be shown into the popup window and checks its
   * status.
   * @param event
   */
  onRowSelect(event) {
    this.checkStatusType(this.selectedBug.status);
    this.popUpBug = this.cloneBug(event.data);
    this.selectedBugDate = new Date(this.popUpBug.targetDate);
    this.displayBugPopUp = true;
    this.currentBugStatus = this.popUpBug.status;
    this.attachmentOfBug(event.data);
  }

  checkStatusType(currentStatus: Status) {
    if (currentStatus === Status.FIXED) {
      this.isStatusFixed = true;
    } else if (currentStatus === Status.REJECTED) {
      this.isStatusRejected = true;
    } else {
      this.isStatusFixed = false;
      this.isStatusRejected = false;
    }
  }

  cloneBug(b: BugToShow): BugToShow {
    const bug = Object.assign({}, b);
    return bug;
  }

  /**
   * Maps the backend bug entities to frontend bug entities.
   */
  getBugsToView() {
    this.bugsToView = new Array<BugToShow>();
    for (let i = 0; i < this.bugs.length; i++) {
      const bugToView = {} as BugToShow;
      bugToView.id = this.bugs[i].id;
      bugToView.title = this.bugs[i].title;
      bugToView.description = this.bugs[i].description;
      bugToView.version = this.bugs[i].version;
      bugToView.targetDate = this.bugs[i].targetDate;
      bugToView.fixedVersion = this.bugs[i].fixedVersion;
      bugToView.createdId = this.bugs[i].createdId.username;
      bugToView.status = this.bugs[i].status;
      bugToView.severity = this.bugs[i].severity;

      if (this.bugs[i].assignedId === null) {
        bugToView.assignedId = '';
      } else {
        bugToView.assignedId = this.bugs[i].assignedId.username;
      }
      this.bugsToView.push(bugToView);
    }
  }

  /**
   * Custom sort method for bug attributes.
   * @param event
   */
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      const value1 = data1[event.field];
      const value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) {
        result = -1;
      } else if (value1 != null && value2 == null) {
        result = 1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else if (event.field === 'assignedId') {
        result = data1.assignedId.username.localeCompare(data2.assignedId.username);
      } else if (event.field === 'createdId') {
        result = data1.createdId.username.localeCompare(data2.createdId.username);
      } else {
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      }
      return (event.order * result);
    });
  }

  /**
   * Method sends a request to the backend service
   * to check whether the current user has the given permission.
   * @param requiredPermission
   */
  checkIfUserHasPermission(requiredPermission: string) {
    this.permissionChecker.checkIfUserHasPermission(this.loggedInUser, requiredPermission).subscribe(
      (obj) => {
        if (requiredPermission === 'BUG_MANAGEMENT') {
          this.userHasManagementPermission = obj;
        } else if (requiredPermission === 'BUG_CLOSE') {
          this.userHasBugClosePermission = obj;
        } else if (requiredPermission === 'BUG_EXPORT_PDF') {
          this.userHasExportPermission = obj;
        }
      },
      (error: HttpErrorResponse) => {
        this.toastrService.error("Internal error.");
      }
    );
    return false;
  }

  /**
   * The method creates a bug entity given user data and sends an update
   * request to the backend service.
   * @param editBugForm
   */
  editBug(editBugForm: NgForm) {
    const bugToInsert: Bug = {} as Bug;
    bugToInsert.id = this.popUpBug.id;
    bugToInsert.title = editBugForm.controls.title.value;
    bugToInsert.description = editBugForm.controls.description.value;
    bugToInsert.version = editBugForm.controls.version.value;
    bugToInsert.targetDate = new DatePipe('en').transform(editBugForm.controls.targetDate.value, 'yyyy-MM-dd');
    bugToInsert.fixedVersion = editBugForm.controls.fixedVersion.value;
    bugToInsert.status = editBugForm.controls.status.value;
    bugToInsert.severity = editBugForm.controls.severity.value;

    // User-entities will be assigned to the created bug entity given the
    // username selected in the user-interface
    const createdUsername = editBugForm.controls.createdId.value;
    const createdByUser = this.findUserWithUsername(createdUsername);
    const assignedUsername = editBugForm.controls.assignedId.value;
    let assignedToUser = {} as User;
    if (assignedUsername != null) {
      assignedToUser = this.findUserWithUsername(assignedUsername);
    } else {
      assignedToUser = null;
    }

    bugToInsert.createdId = createdByUser;
    bugToInsert.assignedId = assignedToUser;

    let attachmentToInsert = this.createAttachment(editBugForm);
    let bugAttWrapper = this.createBugAttachmentWrapper(bugToInsert, attachmentToInsert);

    let bugHasBeenClosed: boolean;
    let statusHasBeenUpdated:boolean;

    if(editBugForm.controls.status.value === Status.CLOSED && this.currentBugStatus != Status.CLOSED){
      bugHasBeenClosed = true;
    }

    if((this.currentBugStatus != editBugForm.controls.status.value) && (editBugForm.controls.status.value != Status.CLOSED)){
      statusHasBeenUpdated = true;
    }

    this.bugsService.editBug(bugAttWrapper).subscribe(
      () => {
        this.initializeData();
        let message = {
          type: 'SENT',
          text: 'Your bug was just updated.'
        }
        this.sendNotificationsService.messages.next(message);
        if(bugHasBeenClosed){
          let closedMessage = {
            type: 'SENT',
            text: 'Your bug has been closed.'
          }
          this.sendNotificationsService.messages.next(closedMessage);
        }
        if(statusHasBeenUpdated){
          let statusUpdateMessage = {
            type: 'SENT',
            text: 'Your bug\'s status has just been updated.'
          }
          this.sendNotificationsService.messages.next(statusUpdateMessage);
        }

      },
      (error: HttpErrorResponse) => {
        this.toastrService.error("Your request could not be completed.");
      }
    );
  }

  createAttachment(editBugForm: NgForm): Attachment {
    let attachmentToInsert: Attachment = {} as Attachment;
    attachmentToInsert.id = 0;
    attachmentToInsert.attContent = editBugForm.controls.attachment.value;
    attachmentToInsert.bug = null;

    return attachmentToInsert;
  }

  createBugAttachmentWrapper(bug: Bug, attachment: Attachment): BugAttachmentWrapper {
    const bugAttWrapper: BugAttachmentWrapper = {} as BugAttachmentWrapper;
    bugAttWrapper.bugDTO = bug;
    bugAttWrapper.attachmentDTO = attachment;
    return bugAttWrapper;
  }

  findUserWithUsername(username: String): User {
    for (const user of this.users) {
      if (user.username === username) {
        return user;
      }
    }
  }

  getTransitionOptions(status: Status) {
    switch (status) {
      case Status.NEW: {
        return this.transitionsFromStatusNew;
      }
      case Status.IN_PROGRESS: {
        return this.transitionsFromStatusInProgress;
      }
      case Status.FIXED: {
        return this.transitionsFromStatusFixed;
      }
      case Status.INFO_NEEDED: {
        return this.transitionsFromStatusInfoNeeded;
      }
      case Status.REJECTED: {
        return this.transitionsFromStatusRejected;
      }
      case Status.CLOSED: {
        return this.transitionsFromStatusClosed;
      }
    }
  }
  exportAsXLSX(): void {
    this.excelbugservice.exportAsExcelFile(this.bugs, 'bugs');
  }

   downloadPdf(bug: BugToShow) {
    const doc = new jsPDF('landscape');
    const col = ['Title', 'Description', 'Target Date', 'Version', 'Status', 'Fixed Version', 'Severity', 'Createfd By', 'Assigned to'];
    const rows = [];

    /* The following array of object as response from the API req  */
    const temp = [bug.title, bug.description, bug.targetDate, bug.version, bug.status, bug.fixedVersion, bug.severity, bug.createdId, bug.assignedId];
    rows.push(temp);


    doc.autoTable(col, rows, {
      startY: 10,
      styles: {
        cellWidth: 'wrap'
      },
      columnStyles: {
        0: {columnWidth: 30},
        1: {columnWidth: 50},
        2: {columnWidth: 10},
        3: {columnWidth: 10},
        4: {columnWidth: 10},
        5: {columnWidth: 10},
        6: {columnWidth: 10},
        7: {columnWidth: 15},
        8: {columnWidth: 15},
      }
    });
    doc.save('Bug-' + bug.title + '.pdf');
   }
}

