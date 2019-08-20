import { User } from './user.model';
import { Bug } from './bug.model';

export interface Comment{   
    id: number;
    text: string;
    date: string;
    user: User;
    bug: Bug;
}