import { Component, EventEmitter, OnDestroy } from '@angular/core';



@Component({
    selector: 'qk-index',
    templateUrl: 'index.component.html',
    styleUrls: ['index.component.css']
})
export class IndexComponent implements OnDestroy {
    ngOnDestroy(): void {
        // this.childRouterOutlet$.unsubscribe();
        // this.instances.splice(0, this.instances.length);
    }

    constructor() {
    }
    childRouterOutlet$: EventEmitter<any> = new EventEmitter<any>();

    instances: any[] = [];
    onActivate(event: any) {
        this.instances.push(event);
        this.childRouterOutlet$.next(event);
    }
    onDeActivate(event: any) {
        this.childRouterOutlet$.next(event);
        this.instances.splice(0, this.instances.length);
    }
}
