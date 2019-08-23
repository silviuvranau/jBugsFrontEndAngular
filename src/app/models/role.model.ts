import {Permission} from './permission.model';

export interface Role{
    id: number;
    type: string;
    checked: boolean;
    permissions: Permission[];
}
