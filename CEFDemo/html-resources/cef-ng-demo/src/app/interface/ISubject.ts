import { Subject } from 'rxjs/Subject';
import { IAction } from './IAction';
export interface ISubject {
    key: string;
    subject: Subject<IAction>;
    unsubscribe: Function;
}