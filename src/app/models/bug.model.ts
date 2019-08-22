import { User } from './user.model';

export enum Severity {
    LOW,
    MEDIUM,
    HIGH,
    CRITICAL
}

export enum Status {
    NEW,
    IN_PROGRESSS,
    FIXED,
    CLOSED,
    REJECTED,
    INFO_NEEDED
}

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
}
