import { IModuleCommandBase } from '../IModuleCommandBase';

export class SalesModuleCommand implements IModuleCommandBase {

    static staticModuleId = "salesModuleId";
    moduleId: string;
    moduleName: string;
    outlet: string;
    path: string;
    enabled: boolean;

    constructor() {
        this.moduleId = SalesModuleCommand.staticModuleId;
        this.moduleName = "salesModuleName";
        this.outlet = "salesModule";
        this.path = "sales-module/salesModule";
    }
}