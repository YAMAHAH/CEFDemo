// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { SalesOrderQueryComponent } from './sales-order-query.component';
import { Routes, RouterModule } from '@angular/router';

export const salesOrderQueryRouteConfig: Routes = [
    { path: "", component: SalesOrderQueryComponent, data: { title: '销售订单查询' } }
];


@NgModule({
    imports: [
        RouterModule.forChild(salesOrderQueryRouteConfig)
    ],
    declarations: [
        SalesOrderQueryComponent,
    ],
    exports: [
        SalesOrderQueryComponent,
    ]
})
export class SalesOrderQueryModule {

}
