import { IMessageData } from "./IMessageData";

export interface IAction {
    /**
     * 目标类型
     */
    target: string;
    actionType?: string;
    /**
     * ACTION数据
     */
    data?: IMessageData;
}