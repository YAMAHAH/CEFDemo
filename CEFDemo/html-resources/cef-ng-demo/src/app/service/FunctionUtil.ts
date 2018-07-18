
export function InjectService(serviceName: string = "") {
    return function (target, propertyName: string) {
        if (!serviceName) serviceName = propertyName;
        target[propertyName] = window[serviceName] || window["ngService"][serviceName] || window["netService"][serviceName];
    }
}

function InjectParam(paramName: string) {
    return function (target, methodName: string, paramIndex: number) {
        !target.$Meta && (target.$Meta = {});
        target.$Meta[paramIndex] = paramName;
    }
}

export function ExposeService(serviceName: string = "") {
    return function (target: Function) {
        let srvName = serviceName;
        let ngSrv = window["ngService"];
        if (!serviceName) {
            srvName = target.name
        }
        // !target.prototype.$Meta && (target.prototype.$Meta = {})
        // target.prototype.$Meta.baseUrl = serviceName;
        !ngSrv && (ngSrv = window["ngService"] = {})
        ngSrv[srvName] = target;
    };
}

export function ExposeFunction(functionName: string = "") {
    return function (target, methodName: string, descriptor: PropertyDescriptor) {
        if (!functionName) {
            functionName = methodName;
        }
        let ngFn = window["ngFunction"];
        !ngFn && (ngFn = window["ngFunction"] = {})
        ngFn[functionName] = target[methodName];
    }
}


export function testMethod(str) {
    alert(str);
    return { id: 123456, name: "彩笔LEE" };
}
