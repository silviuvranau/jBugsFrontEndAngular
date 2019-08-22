import {Component, OnInit} from '@angular/core';
import {BugsService} from './bugs.service';
import {Bug} from '../models/bug.model';
import {SortEvent} from "primeng/api";

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})
export class BugsComponent implements OnInit {

  bugs: Bug[];

  cols: any[];

  constructor(private bugsService: BugsService) {
  }

  ngOnInit() {
    this.bugsService.getAllRoles().subscribe(obj => {
      this.bugs = obj;
      // console.log(this.bugs);
    });

    this.cols = [
      {field: 'title', header: 'Title'},
      {field: 'description', header: 'Description'},
      {field: 'version', header: 'Version'},
      {field: 'targetDate', header: 'Target Date'},
      {field: 'status', header: 'Status'},
      {field: 'fixedVersion', header: 'Fixed Version'},
      {field: 'severity', header: 'Severity'},
      {field: 'createdId', header: 'Created Username'},
      {field: 'assignedId', header: 'Assigned Username'}
    ];
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
}
