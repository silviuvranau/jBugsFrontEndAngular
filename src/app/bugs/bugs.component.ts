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
import 'jspdf-autotable';
import {TranslateService} from "@ngx-translate/core";

declare let jsPDF;

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
  isStatusFixed: boolean;
  isStatusRejected: boolean;

  users: User[];
  bugs: Bug[];
  bugsToView: BugToShow[];
  popUpBug: BugToShow;
  selectedBug: BugToShow;
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
              private cookieService: CookieService, private excelbugservice: ExcelBugsService, private translateService: TranslateService) {
  }

  ngOnInit() {
    this.loggedInUser = this.cookieService.get('username');
    this.initializeData();
    this.bugsService.getAllUsers().subscribe(obj => {
      this.users = obj;
      this.usernamesForFilter = [
        {label: 'All', value: null}
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
      {label: 'NEW', value: 'NEW'},
      {label: 'IN_PROGRESS', value: 'IN_PROGRESS'},
      {label: 'REJECTED', value: 'REJECTED'},
    ];

    this.transitionsFromStatusInProgress = [
      {label: 'INFO_NEEDED', value: 'INFO_NEEDED'},
      {label: 'REJECTED', value: 'REJECTED'},
      {label: 'FIXED', value: 'FIXED'},
    ];

    this.transitionsFromStatusFixed = [
      {label: 'FIXED', value: 'FIXED'},
      {label: 'CLOSED', value: 'CLOSED'},
    ];

    this.transitionsFromStatusInfoNeeded = [
      {label: 'INFO_NEEDED', value: 'INFO_NEEDED'},
      {label: 'IN_PROGRESS', value: 'IN_PROGRESS'},
    ];

    this.transitionsFromStatusRejected = [
      {label: 'REJECTED', value: 'REJECTED'},
      {label: 'CLOSED', value: 'CLOSED'},
    ];

    this.transitionsFromStatusClosed = [
      {label: 'CLOSED', value: 'CLOSED'},
    ];
  }

  initializeData() {
    this.bugsService.getAllBugs().subscribe((obj) => {
      this.bugs = obj;
      this.getBugsToView();
      this.checkIfUserHasPermission('BUG_MANAGEMENT');
      this.checkIfUserHasPermission('BUG_CLOSE');
      console.log('BUG MANAGEMENT ', this.userHasManagementPermission);
      console.log('BUG CLOSE ', this.userHasBugClosePermission);
    }, ((error: HttpErrorResponse) => {
      console.error(error);
      this.toastrService.error(error.error);
    }));
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

      // bugToView = new BugToShow(this.bugs[i].id, this.bugs[i].title, this.bugs[i].description, this.bugs[i].version, this.bugs[i].targetDate,
      //   this.bugs[i].fixedVersion, this.bugs[i].createdId.username, this.bugs[i].assignedId.username, this.bugs[i].status,
      //   this.bugs[i].severity);
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
        }
        // return obj;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.toastrService.error(error.message);
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

    this.bugsService.editBug(bugToInsert.id, bugToInsert).subscribe(
      () => {
        this.initializeData();
        this.toastrService.success('Bug edited successfully');

      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.toastrService.error(error.message);
      }
    );
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
    const doc = new jsPDF();
    const col = ['Title', 'Description', 'Target Date', 'Version', 'Status', 'Fixed Version', 'Severity', 'Createfd By', 'Assigned to'];
    const rows = [];

    /* The following array of object as response from the API req  */
    const temp = [bug.title, bug.description, bug.targetDate, bug.version, bug.status, bug.fixedVersion, bug.severity, bug.createdId, bug.assignedId];
    rows.push(temp);


    doc.autoTable(col, rows, {startY: 10});
    doc.save('Bug-' + bug.title + '.pdf');
  }
}

