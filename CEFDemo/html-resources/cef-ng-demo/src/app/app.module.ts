import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestService } from './service/TestService';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SelectivePreloadingStrategy } from './service/SelectivePreloadingStrategy';
import { rootRouterConfig } from './AppRouterConfig';
import { AppGlobalService } from './service/AppGlobalService';
import { PortalComponent } from './portal/PortalComponent';
import { RouterOutletModule } from './component/router-outlet/router-outlet.module';
import { RouterService } from './service/RouterService';
import { AUTHPROVIDERS } from "./module/auth-module/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    PortalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(rootRouterConfig, {
      enableTracing: false,
      useHash: false,
      preloadingStrategy: SelectivePreloadingStrategy
    }),
    RouterOutletModule
  ],
  providers: [
    TestService,
    SelectivePreloadingStrategy,
    RouterService,
    AppGlobalService,
    ...AUTHPROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
