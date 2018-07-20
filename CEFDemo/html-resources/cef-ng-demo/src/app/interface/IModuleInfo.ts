import { Observable } from 'rxjs/Observable';
import { Route } from '@angular/router';

export interface IMoudleInfo {
    key: string;
    loader: () => Observable<any>;
    counter: number;
    route: Route
}