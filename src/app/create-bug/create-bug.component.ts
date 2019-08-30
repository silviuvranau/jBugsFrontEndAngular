import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {SelectItem} from "primeng/api";
import {Bug, Severity} from "../models/bug.model";
import {CookieService} from "ngx-cookie-service";
import {User} from "../models/user.model";
import {UserService} from "../service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {Attachment} from "../models/attachment.model";
import {BugAttachmentWrapper} from "../models/bugAttachmentWrapper.model";
import {BugsService} from "../bugs/bugs.service";

@Component({
  selector: 'app-create-bug',
  templateUrl: './create-bug.component.html',
  styleUrls: ['./create-bug.component.css']
})
export class CreateBugComponent implements OnInit {
  loggedInUser: string;

  users: User[];
  severityTypes: SelectItem[];
  assignedToUsernamesForDropDown: SelectItem[];
  currentDate: Date;


  constructor(private cookieService: CookieService, private userService: UserService, private toastrService: ToastrService,
              private bugsService: BugsService) {
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((obj) => {
      this.users = obj;
      this.createUsernameLabels();
    }, ((error: HttpErrorResponse) => {
      console.error(error);
      this.toastrService.error(error.message);
    }));

    this.currentDate = new Date();
    this.loggedInUser = this.cookieService.get("username");
    this.severityTypes = [
      {label: 'LOW', value: Severity.LOW},
      {label: 'MEDIUM', value: Severity.MEDIUM},
      {label: 'HIGH', value: Severity.HIGH},
      {label: 'CRITICAL', value: Severity.CRITICAL},
    ];
  }

  createUsernameLabels() {
    this.assignedToUsernamesForDropDown = [
      {label: "No one", value: null}
    ];
    for (let i = 0; i < this.users.length; i++) {
      this.assignedToUsernamesForDropDown.push({label: this.users[i].username, value: this.users[i].username});
    }
  }

  findUserWithUsername(username: String): User {
    for (let user of this.users) {
      if (user.username === username) {
        return user;
      }
    }
  }

  addBug(createBugForm: NgForm) {
    let bugToInsert = this.createBug(createBugForm);
    let attachmentToInsert = this.createAttachment(createBugForm);
    let bugAttWrapper = this.createBugAttachmentWrapper(bugToInsert, attachmentToInsert);

    console.log(bugAttWrapper);

    this.bugsService.insertBug(bugAttWrapper).subscribe(
      () => {
        this.toastrService.success("Bug added successfully");

      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.toastrService.error(error.message);
      }
    )
  }

  createBug(createBugForm: NgForm): Bug {
    let bugToInsert: Bug = {} as Bug;
    bugToInsert.id = 0;
    bugToInsert.title = createBugForm.controls.title.value;
    bugToInsert.description = createBugForm.controls.description.value;
    bugToInsert.version = createBugForm.controls.version.value;
    bugToInsert.targetDate = new DatePipe('en').transform(createBugForm.controls.targetDate.value, 'yyyy-MM-dd');
    bugToInsert.fixedVersion = createBugForm.controls.fixedVersion.value;
    bugToInsert.status = createBugForm.controls.status.value;
    bugToInsert.severity = createBugForm.controls.severity.value;

    let createdByUser = this.findUserWithUsername(this.loggedInUser);
    let assignedUsername = createBugForm.controls.assignedTo.value;
    let assignedToUser = {} as User;
    if (assignedUsername != null) {
      assignedToUser = this.findUserWithUsername(assignedUsername);
    } else {
      assignedToUser = null;
    }

    bugToInsert.createdId = createdByUser;
    bugToInsert.assignedId = assignedToUser;

    return bugToInsert;
  }

  createAttachment(createBugForm: NgForm): Attachment {
    let attachmentToInsert: Attachment = {} as Attachment;
    attachmentToInsert.id = 0;
    attachmentToInsert.attContent = createBugForm.controls.attachment.value;
    attachmentToInsert.bug = null;

    return attachmentToInsert;
  }

  createBugAttachmentWrapper(bug: Bug, attachment: Attachment): BugAttachmentWrapper {
    const bugAttWrapper: BugAttachmentWrapper = {} as BugAttachmentWrapper;
    bugAttWrapper.bugDTO = bug;
    bugAttWrapper.attachmentDTO = attachment;
    return bugAttWrapper;
  }
}
