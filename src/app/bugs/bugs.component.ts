import {Component, OnInit, ViewChild} from '@angular/core';
import {BugsService} from './bugs.service';
import {Bug, BugToShow, Severity, Status} from '../models/bug.model';
import {SelectItem, SortEvent} from 'primeng/api';
import {User} from '../models/user.model';
import {Table} from "primeng/table";
import {DatePipe} from "@angular/common";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})
export class BugsComponent implements OnInit {

  selectedBugDate = new Date();

  displayDialog: boolean;

  bug: BugToShow;

  selectedBug: BugToShow;

  bugs: Bug[];
  bugsToView: BugToShow[];

  users: User[];

  username: SelectItem[];

  createdByUsernames: SelectItem[];

  cols: any[];

  statusTypes: SelectItem[];
  severityTypes: SelectItem[];

  transitionsFromStatusNew: SelectItem[];
  transitionsFromStatusInProgress: SelectItem[];
  transitionsFromStatusFixed: SelectItem[];
  tranisitionsFromStatusInfoNeeded: SelectItem[]
  transitionsFromStatusRejected: SelectItem[];
  transitionsFromStatusClosed: SelectItem[];

  statusCheck: Status;

  @ViewChild('dt', {static: true})
  dt: Table;

  constructor(private bugsService: BugsService, private datePipe: DatePipe, private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.bugsService.getAllBugs().subscribe(obj => {
      this.bugs = obj;
      console.log(this.bugs);
      this.getBugsToView();
      console.log(this.bugsToView);

      this.dt.filterConstraints['dateFilter'] = function inCollection(value: any, filter: any): boolean {
        console.log(value);
        console.log("Filter: " + new DatePipe('en').transform(filter, 'yyyy-MM-dd'));
        if (filter === undefined || filter === null || (filter.length === 0 || filter === "") && value === null) {
          return true;
        }
        if (value === undefined || value === null || value.length === 0) {
          return false;
        }
        if (new DatePipe('en').transform(value, 'yyyy-MM-dd') == new DatePipe('en').transform(filter, 'yyyy-MM-dd')) {
          return true;
        }
        return false;
      }
    });

    this.bugsService.getAllUsers().subscribe(obj => {
      this.users = obj;
      this.username = [
        {label: 'All', value: null}
      ];
      this.createUsernameLabels();
    });

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

    this.statusTypes = [
      {label: 'NEW', value: 'NEW'},
      {label: 'IN_PROGRESS', value: 'IN_PROGRESS'},
      {label: 'FIXED', value: 'FIXED'},
      {label: 'CLOSED', value: 'CLOSED'},
      {label: 'REJECTED', value: 'REJECTED'},
      {label: 'INFO_NEEDED', value: 'INFO_NEEDED'},
    ];

    this.severityTypes = [
      {label: 'LOW', value: 'LOW'},
      {label: 'MEDIUM', value: 'MEDIUM'},
      {label: 'HIGH', value: 'HIGH'},
      {label: 'CRITICAL', value: 'CRITICAL'},
    ];

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
      {label: 'CLOSED', value: 'CLOSED'},
    ];

    this.tranisitionsFromStatusInfoNeeded = [
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

  createUsernameLabels() {
    for (let i = 0; i < this.users.length; i++) {
      this.username.push({label: this.users[i].username, value: this.users[i].username});

      if (i == 0) {
        this.createdByUsernames = [
          {label: this.users[i].username, value: this.users[i].username}
        ];
      } else {
        this.createdByUsernames.push({label: this.users[i].username, value: this.users[i].username});
      }
    }
  }

  getBugsToView() {
    var bugToView = {} as BugToShow;
    this.bugsToView = new Array<BugToShow>();
    for (let i = 0; i < this.bugs.length; i++) {
      bugToView = new BugToShow(this.bugs[i].id, this.bugs[i].title, this.bugs[i].description, this.bugs[i].version, this.bugs[i].targetDate,
        this.bugs[i].fixedVersion, this.bugs[i].createdId.username, this.bugs[i].assignedId.username, this.bugs[i].status,
        this.bugs[i].severity);
      this.bugsToView.push(bugToView);
    }
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      const value1 = data1[event.field];
      const value2 = data2[event.field];
      let result = null;

      console.log(value1);
      console.log(value2);

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

  onRowSelect(event) {
    this.bug = this.cloneBug(event.data);
    this.selectedBugDate = new Date(this.bug.targetDate);
    console.log(this.bug);
    this.displayDialog = true;
  }

  cloneBug(b: BugToShow): BugToShow {
    const bug = Object.assign({}, b);
    return bug;
  }

  // addEvent(change: string, event: MatDatepickerInputEvent<any>) {
  //   // this.events.push(`${type}: ${event.value}`);
  //   console.log(event.value);
  //   console.log(change);
  // }
  //
  // checkThings(dt: any, event: any, col: any) {
  //   console.log(event.value);
  //   console.log();
  //   dt.filter(event.value, col, 'equals')
  // }
  //
  consoleLog(event, col) {
    console.log(event);
    console.log(col);
  }

  editBug(editBugForm: NgForm) {
    let bugToInsert: Bug = {} as Bug;
    bugToInsert.id = this.bug.id;
    bugToInsert.title = editBugForm.controls.title.value;
    bugToInsert.description = editBugForm.controls.description.value;
    bugToInsert.version = editBugForm.controls.version.value;
    bugToInsert.targetDate = new DatePipe('en').transform(editBugForm.controls.targetDate.value, 'yyyy-MM-dd');
    bugToInsert.fixedVersion = editBugForm.controls.fixedVersion.value;
    bugToInsert.status = editBugForm.controls.status.value;
    bugToInsert.severity = editBugForm.controls.severity.value;

    let assignedUsername = editBugForm.controls.assignedId.value;
    let createdUsername = editBugForm.controls.createdId.value;
    let assignedToUser = this.findUserWithUsername(assignedUsername);
    let createdByUser = this.findUserWithUsername(createdUsername);

    bugToInsert.createdId = assignedToUser;
    bugToInsert.assignedId = createdByUser;

    console.log(bugToInsert);

    this.bugsService.editBug(bugToInsert.id, bugToInsert).subscribe(
      () => {
        this.toastrService.success("Bug edited successfully");
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.toastrService.error(error.message);
      }
    )
  }

  findUserWithUsername(username: String): User {
    for (let user of this.users) {
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
        return this.tranisitionsFromStatusInfoNeeded;
      }
      case Status.REJECTED: {
        return this.transitionsFromStatusRejected;
      }
      case Status.CLOSED: {
        return this.transitionsFromStatusClosed;
      }
    }
  }
}

