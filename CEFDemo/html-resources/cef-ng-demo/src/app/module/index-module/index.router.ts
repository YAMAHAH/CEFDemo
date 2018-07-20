import { Routes } from '@angular/router';
import { IndexComponent } from './index.component';

export const pcRootRouterConfig: Routes = [
    { path: "", redirectTo: "navigation", pathMatch: 'full' },
    {
        path: 'navigation',
        loadChildren: '../navigation-module/navigation.module#NavigationModule',
        data: { title: '系统导航' }
    },
    {
        path: 'purchase-module/purchaseOrder',
        component: IndexComponent,
        outlet: 'purchaseOrder',
        loadChildren: "../purchase-module/purchase-order/purchase-order.module#PurchaseOrderModule",
        data: { title: '采购订单模块', preload: false }
    },
    {
        path: 'purchase-module/purchaseOrderQuery',
        component: IndexComponent,
        outlet: 'purchaseOrderQuery',
        loadChildren: "../purchase-module/purchase-order-query/purchase-order-query.module#PurchaseOrderQueryModule",
        data: { title: '采购订单查询模块', preload: false }
    },
    {
        path: 'sales-module',
        component: IndexComponent,
        outlet: 'salesOrder',
        children: [
            {
                path: 'salesOrder',
                loadChildren: "../sales-module/sales-order/sales-order.module#SalesOrderModule",
                data: { title: '销售订单模块', preload: false }
            },
            {
                path: 'salesOrderQuery',
                loadChildren: "../sales-module/sales-order-query/sales-order-query.module#SalesOrderQueryModule",
                data: { title: '销售订单查询模块', preload: false }
            }
        ]
    }
];
