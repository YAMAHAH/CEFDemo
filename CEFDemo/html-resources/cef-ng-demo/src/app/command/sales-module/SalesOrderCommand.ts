import { ITemplateCommandBase } from '../ITemplateCommandBase';
import { SalesModuleCommand } from "./SalesModuleCommand";
import { SalesSubSystem } from "../SubSystemConst";

export class SalesOrderCommand implements ITemplateCommandBase {
    enabled: boolean;
    templateId: string;
    templateName: string;
    templateTitle: string;
    templateIconPath: string;
    subSystemId: string;
    moduleId: string;

    constructor() {
        this.enabled = true;
        this.templateId = "salesOrderTemplateId";
        this.templateName = "salesOrderTemplateName";
        this.templateTitle = "销售订单";
        this.templateIconPath = "";
        this.subSystemId = SalesSubSystem;
        this.moduleId = SalesModuleCommand.staticModuleId;
    }

}