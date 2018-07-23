import { ICommandBase } from './ICommandBase';

export interface IModuleCommandBase extends ICommandBase {

    moduleId: string;
    moduleName: string;
    //入口
    outlet: string;
    //路径
    path: string;
    //是否启用
    enabled: boolean;
}