import {Component, OnInit, ViewChild} from '@angular/core';
import {BugsService} from './bugs.service';
import {Bug, BugToShow, Status} from '../models/bug.model';
import {SelectItem, SortEvent} from 'primeng/api';
import {MatDatepickerInputEvent} from '@angular/material';
import {User} from '../models/user.model';
import {Table} from "primeng/table";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})
export class BugsComponent implements OnInit {

  displayDialog: boolean;

  bug: Bug;

  selectedBug: Bug;

  bugs: Bug[];
  bugsToView: BugToShow[];

  users: User[];

  username: SelectItem[];

  cols: any[];

  statusTypes: any[];

  severityTypes: any[];

  @ViewChild('dt', {static: true})
  dt: Table;

  constructor(private bugsService: BugsService, private datePipe: DatePipe) {
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
      {field: 'targetDate', header: 'Target Date', width: '300px'},
      {field: 'status', header: 'Status', width: '200px'},
      {field: 'fixedVersion', header: 'Fixed Version', width: '70px'},
      {field: 'severity', header: 'Severity', width: '200px'},
      {field: 'createdId', header: 'Created Username', width: '200px'},
      {field: 'assignedId', header: 'Assigned Username', width: '200px'}
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

  }

  createUsernameLabels() {
    for (let i = 0; i < this.users.length; i++) {
      this.username.push({label: this.users[i].username, value: this.users[i].username});
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
    this.displayDialog = true;
  }

  cloneBug(b: Bug): Bug {
    const bug = Object.assign({}, b);
    return bug;
  }

  addEvent(change: string, event: MatDatepickerInputEvent<any>) {
    // this.events.push(`${type}: ${event.value}`);
    console.log(event.value);
    console.log(change);
  }

  checkThings(dt: any, event: any, col: any) {
    console.log(event.value);
    console.log();
    dt.filter(event.value, col, 'equals')
  }

  consoleLog(event, col) {
    console.log(event);
    console.log(col);
  }


}
