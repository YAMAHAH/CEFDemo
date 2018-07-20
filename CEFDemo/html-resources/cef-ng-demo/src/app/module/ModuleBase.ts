import { IAction } from "../interface/IAction";
import { AppGlobalService } from "../service/AppGlobalService";
import { Injector, Type, InjectionToken } from '@angular/core';
import { IModuleRef } from '../interface/IModuleRef';

export abstract class ModuleBase implements IModuleRef {

    ModuleName:string;

    getService<T>(serviceType: Type<T> | InjectionToken<T>): T {
        return null;
    }
    protected globalService: AppGlobalService;
    constructor(protected injector: Injector, moduleKey: string) {
        this.ModuleName = moduleKey;
        this.globalService = this.injector.get(AppGlobalService);
        this.registryModule({ target: moduleKey, data: { state: this } }, false, true);
    }

    protected registryModule(action: IAction, hasRetureValue: boolean = false, useBehaviorSubject: boolean = true) {
        this.globalService.dispatch(action, hasRetureValue, useBehaviorSubject);
    }
}