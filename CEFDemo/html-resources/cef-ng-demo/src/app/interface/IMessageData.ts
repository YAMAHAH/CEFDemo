import { Observable } from 'rxjs/Observable';
export interface IMessageData {
    /**
     * 发送者类型
     */
    sender?: string | Observable<any> | any;
    /**
     * 信息状态数据
     */
    state?: any;
}