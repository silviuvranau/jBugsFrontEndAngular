import {Permission} from './permission.model';

export interface Role {
    id: number;
    type: string;
  permissions: Permission[];
}
