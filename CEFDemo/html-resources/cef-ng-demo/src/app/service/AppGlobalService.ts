import { Injectable, Type } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { IAction } from '../interface/IAction';
import { ISubject } from "../interface/ISubject";
import { IModuleRef } from '../interface/IModuleRef';
import { IModuleType } from "../interface/IModuleType";
import { filter, map } from 'rxjs/operators';
import { UUID } from "../utils/UUID";
import { INavTabModel } from "../interface/NavTabModel";
import { INavDesktopItem } from '../interface/NavDesktopItem';
import { RouterService } from './RouterService';
import { IRouterOutletPortal } from "../interface/router/IRouterOutletPortal";

@Injectable()
export class AppGlobalService {

    constructor(public routerService: RouterService) {

    }

    private _store: Map<string, Subject<IAction>> = new Map<string, Subject<IAction>>();
    private _appStore: Subject<IAction> = new Subject<IAction>();;
    dispatch(action: IAction, hasState: boolean = false, useBehaviorSubject: boolean = false) {
        let state$ = null;
        if (hasState) {
            state$ = new BehaviorSubject<any>(null);
            action.data.sender = state$;
        }
        if (action.target) {
            this.select(action.target, true, useBehaviorSubject).subject.next(action);
        } else {
            this._appStore.next(action);
        }
        return state$;
    }
    select(subject: string, onlyOne: boolean = true, useBehaviorSubject: boolean = false): ISubject {
        let key: string = subject;
        if (!this._store.has(subject)) {
            this._store.set(subject, (useBehaviorSubject ? new BehaviorSubject<IAction>(null) : new Subject<IAction>()));
        } else if (!onlyOne) {
            let id = UUID.uuid(8, 16);
            key = subject + "-" + id;
        }
        return {
            key: key,
            subject: this._store.get(subject),
            unsubscribe: () => this.unsubscribe(subject)
        };
    }

    unsubscribe(key: string) {
        if (this._store.has(key)) {
            this._store.get(key).unsubscribe();
        }
    }

    private getModuleDescriptor(key: string) {
        let m = this.select(key, true, true);
        return {
            moduleLoad$: m.subject.pipe<IAction, IModuleRef>(
                filter(action => action && action.data && action.data.state),
                map(action => action.data.state)),
            unsubscribe: m.unsubscribe
        };
    }

    async moduleReady(moduleType: string | Type<IModuleType>,
        subscribe?: (moduleRef: IModuleRef) => void, runOnce: boolean = true) {
        let moduleLoad$ = typeof moduleType === 'string' ?
            this.getModuleObservable(moduleType) :
            this.getModuleObservable((new moduleType()).moduleKey);

        let defaultFn = () => { };
        if (!moduleLoad$) return defaultFn;
        if (subscribe && runOnce) {
            moduleLoad$.subscribe(subscribe).unsubscribe();
            return defaultFn;
        }
        else if (subscribe) {
            let subscription = moduleLoad$.subscribe(subscribe);
            return () => subscription.unsubscribe();
        }
        return defaultFn;
    }

    getModuleObservable(moduleType: string) {
        let moduleRef = this.getModuleDescriptor(moduleType);
        return moduleRef.moduleLoad$;
    }

    moduleLoadedMap: Map<string, IModuleRef> = new Map<string, IModuleRef>();

    registerModuleRef(moduleType: IModuleRef) {
        if (!!!moduleType || this.moduleLoadedMap.has(moduleType.ModuleName)) return;
        this.moduleLoadedMap.set(moduleType.ModuleName, moduleType);
        return () => this.unRegisterModuleRef(moduleType);
    }
    unRegisterModuleRef(moduleType: IModuleRef) {
        if (!!!moduleType || !this.moduleLoadedMap.has(moduleType.ModuleName)) return;
        this.moduleLoadedMap.delete(moduleType.ModuleName);
    }
    async GetOrCreateModule(moduleKey: string | Type<IModuleType>): Promise<IModuleRef> {
        let moduleType: IModuleType, refEntries, refValue;
        if (typeof moduleKey === 'string') {
            if (moduleKey && this.moduleLoadedMap.has(moduleKey))
                return this.moduleLoadedMap.get(moduleKey);
        } else {
            refEntries = this.moduleLoadedMap.values();
            refValue = refEntries.next().value;
            while (refValue) {
                if (refValue instanceof moduleKey) {
                    return refValue.componentFactoryRef;
                }
                refValue = refEntries.next().value;
            }
            moduleType = new moduleKey();
        }
        return await this.createModuleFactory(moduleType ? moduleType.moduleKey : null);
    }

    routerOutletPortal: IRouterOutletPortal;
    private commandLinks: INavDesktopItem[] = [
        {
            key: 'pur3',
            title: "采购订单",
            favicon: "/assets/img/save.png",
            path: "purOrder",
            outlet: "pur5",
            subsystem: "news"
        },
        {
            key: 'saleKey',
            title: "销售订单",
            favicon: "/assets/img/setting.png",
            path: "salesOrder",
            outlet: "salesOrder",
            subsystem: "SalesModule"
        },
        {
            key: 'salesQuery12',
            title: "销售订单明细查询",
            favicon: "assets/img/home.png",
            path: "salesQuery1",
            outlet: 'salesQuery',
            subsystem: "SalesModule"
        },
        {
            title: "外协订单",
            favicon: "assets/img/save.png",
            path: "/pc/d3",
            subsystem: "news"
        },
        {
            key: 'purOrderQuery',
            title: "采购订单明细查询",
            favicon: "assets/img/setting.png",
            path: "purOrderQuery",
            outlet: 'purchaseOrderQuery',
            subsystem: "news"
        }
    ];
    private async createModuleFactory(factoryKey: string): Promise<IModuleRef> {
        let navItem = this.commandLinks.find(item => item.outlet === factoryKey);
        if (!navItem) return null;
        if (!navItem.key) {
            navItem.key = UUID.uuid(10, 10).toString();
        }
        let navTabModel: INavTabModel = {
            key: navItem.key,
            name: navItem.key,
            title: navItem.title,
            favicon: navItem.favicon,
            outlet: navItem.outlet,
            active: false,
            showTabContent: false, //this.showType === ShowTypeEnum.tab ? true : false,
            path: navItem.path,
            daemon: true
        };
        return await this.routerOutletPortal.createModuleOutletPortal(navTabModel);
    }

}