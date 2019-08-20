import { Bug } from './bug.model';

export interface Model {
    id: number;
    attContent: string;
    bug: Bug;
}