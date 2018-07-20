import { Component, OnInit, Injector, Type } from '@angular/core';
import { NetServiceObject } from './service/NetServiceObject';
import { InjectService, ExposeFunction, getHandle } from './service/FunctionUtil';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'qk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {

    getHandle(window).qt.commonModule.httpClient = this.httpClient;
    getHandle(window).qt.commonModule.injector = this.injector;

  }

  constructor(private httpClient: HttpClient,
    private injector: Injector) {

  }

  @ExposeFunction()
  getService<T>(serviceType: Type<T>) {
    return this.injector.get(serviceType);
  }

}
