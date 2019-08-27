import {User} from './user.model';

export enum Severity {
    LOW,
    MEDIUM,
    HIGH,
    CRITICAL
}

export enum Status {
  NEW = 1,
  IN_PROGRESSS = 2,
  FIXED = 3,
  CLOSED = 4,
  REJECTED = 5,
  INFO_NEEDED = 6
}

export const StatusLabelMapping: Record<Status, string> = {
  [Status.NEW]: 'NEW',
  [Status.IN_PROGRESSS]: 'IN_PROGRESS',
  [Status.FIXED]: 'FIXED',
  [Status.CLOSED]: 'CLOSED',
  [Status.REJECTED]: 'REJECTED',
  [Status.INFO_NEEDED]: 'INFO_NEEDED'
};

export interface Bug {
    id: number;
    title: string;
    description: string;
    version: string;
    targetDate: string;
    fixedVersion: string;
    createdId: User;
    assignedId: User;
    status: Status;
  severity: Severity;
};

export class BugToShow {
  id: number;
  title: string;
  description: string;
  version: string;
  targetDate: string;
  fixedVersion: string;
  createdId: string;
  assignedId: string;
  status: Status;
  severity: Severity;

  constructor(id: number, title: string, description: string, version: string, targetDate: string,
              fixedVersion: string, createdId: string, assignedId: string, status: Status, severity: Severity) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.version = version;
    this.targetDate = targetDate;
    this.fixedVersion = fixedVersion;
    this.createdId = createdId;
    this.assignedId = assignedId;
    this.status = status;
    this.severity = severity;
  }
};
