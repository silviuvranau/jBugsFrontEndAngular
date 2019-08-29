import {User} from './user.model';

export enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum Status {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  FIXED = 'FIXED',
  CLOSED = 'CLOSED',
  REJECTED = 'REJECTED',
  INFO_NEEDED = 'INFO_NEEDED'
}

export interface Bug {
  assignedId: User;
  createdId: User;
  description: string;
  fixedVersion: string;
  id: number;
  severity: Severity;
  status: Status;
  targetDate: string;
  title: string;
  version: string;
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
