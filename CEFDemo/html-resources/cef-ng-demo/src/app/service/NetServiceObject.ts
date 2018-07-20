
export interface NetServiceObject {
    showDevTools();
    opencmd();
    print(json: string);
    jSCallback(callback: Function);
    cSharpCallback();
    netCallbackAsync(key: string, jsonData: string): void;
}
