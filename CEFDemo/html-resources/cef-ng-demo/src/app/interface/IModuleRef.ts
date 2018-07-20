import { Type, InjectionToken } from '@angular/core';

export interface IModuleRef {
    /**
     * 获取模块服务
     */
    getService<T>(serviceType: Type<T> | InjectionToken<T>): T;

    ModuleName:string;
}