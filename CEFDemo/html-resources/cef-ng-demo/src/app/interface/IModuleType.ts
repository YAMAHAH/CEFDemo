import { IModuleRef } from './IModuleRef';
export interface IModuleType {
    factoryKey?: string;
    moduleKey?: string;
    routePath?: string;
    tabKey?: string;
    routeOutlet?: string;
    moduleRef?: IModuleRef;
    [index: string]: any;
}