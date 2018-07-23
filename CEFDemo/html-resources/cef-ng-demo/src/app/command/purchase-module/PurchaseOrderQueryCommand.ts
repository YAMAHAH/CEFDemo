
import { ITemplateCommandBase } from '../ITemplateCommandBase';
import { PurchaseSubSystem } from '../SubSystemConst';
import { PurchaseModuleCommand } from './PurchaseModuleCommand';

export class PurchaseOrderQueryCommand implements ITemplateCommandBase {
    enabled: boolean;
    templateId: string;
    templateName: string;
    templateTitle: string;
    templateIconPath: string;
    subSystemId: string;
    moduleId: string;

    constructor() {
        this.enabled = true;
        this.templateId = "purchaseOrderQueryTemplateId";
        this.templateName = "purchaseOrderQueryTemplateName";
        this.templateTitle = "采购订单查询";
        this.templateIconPath = "";
        this.subSystemId = PurchaseSubSystem;
        this.moduleId = PurchaseModuleCommand.staticModuleId;
    }

}