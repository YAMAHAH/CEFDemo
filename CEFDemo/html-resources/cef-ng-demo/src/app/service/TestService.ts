
import { Injectable } from '@angular/core';
import { testMethod, ExposeService, ExposeFunction, InjectService } from './FunctionUtil';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './GlobalService';
import { ResponseMessage } from '../model/ResponseMessage';


@ExposeService()
@Injectable()
export class TestService {

    @InjectService()
    cefCustomObject: GlobalService;
    private http: HttpClient;

    constructor() {
        this.http = this.http || window["ngCommon"]["httpClient"];
    }

    @ExposeFunction()
    getOrder() {
        this.http.get("http://localhost:8080/test/find")
            .subscribe(res => {
                this.cefCustomObject.print(JSON.stringify(res));
            });
        return JSON.stringify(new ResponseMessage(1001, "sucessful"));
        // return JSON.stringify({
        //     orderId: 123456789, orderNo: "SO-1807180001", items: [
        //         {
        //             itemId: 193243435,
        //             goid: 1111111,
        //             gono: "P010129234234",
        //             goname: "螺丝",
        //             gogg: "1/4-10"
        //         },
        //         {
        //             itemId: 193243436,
        //             goid: 11111113,
        //             gono: "P010129234235",
        //             goname: "螺丝",
        //             gogg: "1/4-13"
        //         }
        //     ]
        // });
    }
    static testMehtod(para: string) {
        console.log(para)
    }
}

// window["TestService"] = TestService
window["TestMethod"] = testMethod