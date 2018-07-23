import { ICommandBase } from './ICommandBase';

export interface ITemplateCommandBase extends ICommandBase {

    templateId: string;
    templateName: string;
    templateTitle: string;
    templateIconPath: string;
    //子系统引用
    subSystemId: string;
    //模块引用
    moduleId: string;
    enabled:boolean;
}