import { Component, OnInit } from '@angular/core';
import { InjectService } from '../service/FunctionUtil';
import { NetServiceObject } from '../service/NetServiceObject';
import { INavTabModel } from "../interface/NavTabModel";
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../service/RouterService';
import { IModuleRef } from '../interface/IModuleRef';
import { AppGlobalService } from '../service/AppGlobalService';
import { IRouterOutletPortal } from "../interface/router/IRouterOutletPortal";
import { UUID } from '../utils/UUID';


@Component({
    selector: 'qk-portal',
    templateUrl: './PortalComponent.html',
    styleUrls: []
})
export class PortalComponent implements OnInit, IRouterOutletPortal {

    constructor(private activeRouter: ActivatedRoute,
        private appGlobalService: AppGlobalService) {
    }

    ngOnInit(): void {
        this.appGlobalService.routerOutletPortal = this;
    }

    json = JSON.stringify({ "id": 134343, "name": "彩笔" });

    @InjectService()
    cefCustomObject: NetServiceObject;

    callback(data) {
        alert(data);
    }

    homeTab: INavTabModel = {
        order: 1,
        key: 'main',
        title: '系统导航',
        favicon: '/assets/images/google-favicon.png',
        outlet: '',
        active: true,
        showTabContent: true,
        daemon: false
    };
    navTabModels: INavTabModel[] = [this.homeTab, {
        order: 2,
        key: 'purchaseOrder',
        title: '采购订单',
        favicon: '/assets/images/google-favicon.png',
        outlet: 'purchaseOrder',
        active: true,
        showTabContent: true,
        daemon: false
    },
    {
        order: 3,
        key: 'salesOrder',
        title: '销售订单',
        favicon: '/assets/images/google-favicon.png',
        outlet: 'salesOrder',
        active: true,
        showTabContent: true,
        daemon: false
    }, {
        order: 4,
        key: 'purchaseOrderQuery',
        title: '采购订单查询',
        favicon: '/assets/images/google-favicon.png',
        outlet: 'purchaseOrderQuery',
        active: true,
        showTabContent: true,
        daemon: false
    }

    ];

    getContentClass(tabModel: INavTabModel) {
        return {
            showTabContent: (tabModel.active && tabModel.showTabContent),
            hideTabContent: !tabModel.active || !tabModel.showTabContent
        };
    }

    openPurOrder() {
        let routeConfig = {};
        routeConfig["purchaseOrder"] = "purchase-module/purchaseOrder";
        routeConfig["purchaseOrderQuery"] = "purchase-module/purchaseOrderQuery";
        this.appGlobalService.routerService.navigateToOutlet(routeConfig, { taskId: "AAAAAAAA" }, this.activeRouter);
    }
    async createModuleOutletPortal(tab: INavTabModel) {
        this.navTabModels.push(tab);
        let moduleRef: IModuleRef = this.appGlobalService.moduleLoadedMap.get(tab.key);
        if (!moduleRef) {
            let routeConfig = {};
            routeConfig[tab.outlet] = tab.path;
            await this.appGlobalService.routerService.navigateToOutlet(routeConfig, { taskId: tab.key }, this.activeRouter);
            moduleRef = await this.appGlobalService.GetOrCreateModule(tab.key);
        }
        return moduleRef;
    }

}