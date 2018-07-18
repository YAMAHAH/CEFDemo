import { Component, OnInit, Injector, Type } from '@angular/core';
import { GlobalService } from './service/GlobalService';
import { InjectService, ExposeFunction } from './service/FunctionUtil';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    window["ngCommon"]={};
    window["ngCommon"]["httpClient"] = this.http;
  }
  title = 'app';
  json = JSON.stringify({ "id": 134343, "name": "彩笔" });

  @InjectService()
  cefCustomObject: GlobalService;

  callback(data) {
    alert(data);
  }

  constructor(private http: HttpClient, private injector: Injector) {

  }
  @ExposeFunction()
  getService<T>(serviceType: Type<T>) {
    return this.injector.get(serviceType);
  }


}
