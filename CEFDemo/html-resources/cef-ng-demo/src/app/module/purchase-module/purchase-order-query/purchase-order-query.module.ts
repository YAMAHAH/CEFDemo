// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { PurchaseOrderQueryComponent } from './purchase-order-query.component';
import { Routes, RouterModule } from '@angular/router';

export const purOrderQueryRouteConfig: Routes = [
    { path: "", component: PurchaseOrderQueryComponent, data: { title: '采购订单查询' }, pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forChild(purOrderQueryRouteConfig)
    ],
    declarations: [
        PurchaseOrderQueryComponent,
    ],
    exports: [
        PurchaseOrderQueryComponent,
    ]
})
export class PurchaseOrderQueryModule {

}
