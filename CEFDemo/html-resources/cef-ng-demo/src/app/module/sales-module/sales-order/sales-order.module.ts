// Angular Imports
import { NgModule, NgZone, Injector } from '@angular/core';

// This Module's Components
import { SalesOrderComponent } from './sales-order.component';
import { Routes, RouterModule } from '@angular/router';
import { SelectivePreloadingStrategy } from '../../../service/SelectivePreloadingStrategy';
import { from } from 'rxjs/observable/from';
import { map, filter } from 'rxjs/operators';
import { IAction } from '../../../interface/IAction';
import { AppGlobalService } from '../../../service/AppGlobalService';
import { ModuleBase } from '../../ModuleBase';

export const salesOrderRouteConfig: Routes = [
    { path: "", component: SalesOrderComponent, data: { title: '销售订单' } }
];


@NgModule({
    imports: [
        RouterModule.forChild(salesOrderRouteConfig)
    ],
    declarations: [
        SalesOrderComponent,
    ],
    exports: [
        SalesOrderComponent,
    ]
})
export class SalesOrderModule extends ModuleBase {

    // this.registryModule({ target: moduleKey, data: { state: this } }, false, true);

    preloadModules: string[] = ['purchaseOrder', 'salesOrder'];
    constructor(private selectivePreloading: SelectivePreloadingStrategy, injector: Injector) {
        super(injector, "salesOrderModule");
        setTimeout(() => {
            from(this.selectivePreloading.notLoadedModuleInfos)
                .pipe(filter(module => this.preloadModules.includes(module.key)))
                .subscribe(module => {
                    module.loader().subscribe();
                });
        }, 15);
    }
}
