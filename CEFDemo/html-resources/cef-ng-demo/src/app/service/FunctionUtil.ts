
export function InjectService(serviceName: string = "") {
    return function (target, propertyName: string) {
        if (!serviceName) serviceName = propertyName;
        target[propertyName] = window[serviceName] || getValue(window).ngService.serviceName || getValue(window).netService.serviceName;
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
        }// !ngFn && (ngFn = window["ngFunction"] = {})//window["ngFunction"];
        let ngFn = getHandle(window).ngFunction;
        ngFn[functionName] = target[methodName];
    }
}

export function getHandle(root) {
    return new Proxy(root, {
        get: function (target, key, receiver) {
            if (!(key in target)) {
                target[key] = createProxy({})
            }
            return Reflect.get(target, key, receiver);
        }
    })
}

function createProxy(root) {
    return new Proxy(root, {
        get: function (target, key, receiver) {
            if (!(key in target)) {
                target[key] = {}
            }
            return Reflect.get(target, key, receiver);
        }
    })
}

export function getValue(root) {
    let hasValue = true;
    return new Proxy(root, {
        get: function (target, key, receiver) {
            if (!(key in target)) {
                hasValue = false;
                return createProxy({});
            }
            return Reflect.get(target, key, receiver);
        },
        has(target, key) {
            if (key[0] === '_' || !hasValue) {
                return false;
            }
            return key in target;
        }
    })
}

export function testMethod(str) {
    alert(str);
    return { id: 123456, name: "彩笔LEE" };
}

function Tree() {
    return new Proxy({}, handler);
}
var handler = {
    get: function (target, key, receiver) {
        if (!(key in target)) {
            target[key] = Tree();
        }
        return Reflect.get(target, key, receiver);
    }
};
