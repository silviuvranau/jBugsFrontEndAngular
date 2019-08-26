import {Component, OnInit} from '@angular/core';
import {BugsService} from './bugs.service';
import {Bug} from '../models/bug.model';
import {SortEvent} from 'primeng/api';
import {ExcelBugsService} from './excel-bugs.service';
import {User} from '../models/user.model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

  cols: any[];

  constructor(private bugsService: BugsService, private excelbugsService: ExcelBugsService) {
  }

  ngOnInit() {
    this.bugsService.getAllRoles().subscribe(obj => {
      this.bugs = obj;
      // console.log(this.bugs);
    });

    this.cols = [
      {field: 'title', header: 'Title', width: '80px'},
      {field: 'description', header: 'Description', width: '200px'},
      {field: 'version', header: 'Version', width: '70px'},
      {field: 'targetDate', header: 'Target Date', width: '200px'},
      {field: 'status', header: 'Status', width: '115px'},
      {field: 'fixedVersion', header: 'Fixed Version', width: '70px'},
      {field: 'severity', header: 'Severity', width: '120px'},
      {field: 'createdId', header: 'Created Username', width: '100px'},
      {field: 'assignedId', header: 'Assigned Username', width: '100px'}
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

  onRowSelect(event) {
    this.bug = this.cloneBug(event.data);
    this.displayDialog = true;
  }

  cloneBug(b: Bug): Bug {
    const bug = Object.assign({}, b);
    return bug;
  }
  exportAsXLSX(): void {
    this.excelbugsService.exportAsExcelFile(this.bugs, 'BugsList');
  }
  downloadPdf(bug: Bug) {
    const doc = new jsPDF();
    const col = ['Title', 'Description', 'Version', 'Target Date', 'Status', 'Fixed Version', 'Severity', 'Created By', 'Assigned To' ];
    const rows = [];

    const temp = [bug.title, bug.description, bug.version, bug.targetDate, bug.status, bug.fixedVersion, bug.severity, bug.createdId, bug.assignedId];
    rows.push(temp);


    doc.autoTable(col, rows, { startY: 10 });
    doc.save('Bug-' + bug.title + '.pdf');
  }
}
