
import { ITemplateCommandBase } from "../ITemplateCommandBase";
import { SalesModuleCommand } from "./SalesModuleCommand";
import { SalesSubSystem } from '../SubSystemConst';

export class SalesOrderListCommand implements ITemplateCommandBase {
    templateId: string;
    templateName: string;
    templateTitle: string;
    templateIconPath: string;
    subSystemId: string;
    moduleId: string;
    enabled: boolean;
    constructor() {
        this.enabled = true;
        this.templateId = "salesOrderQueryTemplateId";
        this.templateName = "salesOrderQueryTemplateName";
        this.templateTitle = "销售订单查询";
        this.templateIconPath = "";
        this.subSystemId = SalesSubSystem;
        this.moduleId = SalesModuleCommand.staticModuleId;
    }
}