// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { PurchaseOrderComponent } from './purchase-order.component';
import { RouterModule, Routes } from '@angular/router';

export const purOrderRouteConfig: Routes = [
    { path: "", component: PurchaseOrderComponent, data: { title: '采购订单' } ,pathMatch:'full'}
];


@NgModule({
    imports: [
        RouterModule.forChild(purOrderRouteConfig)
    ],
    declarations: [
        PurchaseOrderComponent,
    ],
    exports: [
        PurchaseOrderComponent,
    ]
})
export class PurchaseOrderModule {

}
