import {Bug} from "./bug.model";
import {Attachment} from "./attachment.model";

export class BugAttachmentWrapper {
  bugDTO: Bug;
  attachmentDTO: Attachment;

  constructor(bug: Bug, attachment: Attachment) {
    this.bugDTO = bug;
    this.attachmentDTO = attachment;
  }

  get getBug(): Bug {
    return this.bugDTO;
  }

  set setUser(value: Bug) {
    this.bugDTO = value;
  }

  get getAttachment(): Attachment {
    return this.attachmentDTO;
  }

  set setAttachment(value: Attachment) {
    this.attachmentDTO = value;
  }
}
