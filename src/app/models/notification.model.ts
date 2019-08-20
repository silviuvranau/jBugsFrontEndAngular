import { User } from './user.model';

export enum NotificationType{
    WELCOME_NEW_USER,
    USER_UPDATED,
    USER_DELETED,
    BUG_UPDATED,
    BUG_CLOSED,
    BUG_STATUS_UPDATED,
    USER_DEACTIVATED
}

export interface Notification{
    id: number;
    date: string;
    message: string;
    type: NotificationType;
    url: string;
    user: User;
}