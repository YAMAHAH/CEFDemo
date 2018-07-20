
import { NgModule } from '@angular/core';
import { IndexComponent } from './index.component';
import { RouterModule } from '@angular/router';
import { pcRootRouterConfig } from './index.router';

@NgModule({
    imports: [
        RouterModule.forChild(pcRootRouterConfig),
    ],
    declarations: [
        IndexComponent
    ],
    exports: [
        IndexComponent
    ]
})
export class IndexModule {

}
