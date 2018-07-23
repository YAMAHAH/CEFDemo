import { IModuleCommandBase } from '../IModuleCommandBase';
export class PurchaseModuleCommand implements IModuleCommandBase {

    static staticModuleId:string = "purchaseModuleId";
    moduleId: string;
    moduleName: string;
    outlet: string;
    path: string;
    enabled: boolean;

    constructor() {
        this.moduleId = PurchaseModuleCommand.staticModuleId;
        this.moduleName = "purchaseModuleName";
        this.outlet = "purchaseModule";
        this.path = "purchase-module/purchaseModule";
    }

}