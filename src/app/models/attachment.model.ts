import {Bug} from './bug.model';

export interface Attachment {
    id: number;
    attContent: string;
    bug: Bug;
}
