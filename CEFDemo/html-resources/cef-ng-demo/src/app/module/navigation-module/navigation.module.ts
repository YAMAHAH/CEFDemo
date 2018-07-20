// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { NavigationComponent } from './navigation.component';
import { Routes, RouterModule } from '@angular/router';

export const navigationRouteConfig: Routes = [
    { path: "", component: NavigationComponent, data: { title: '系统导航' }, pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forChild(navigationRouteConfig)
    ],
    declarations: [
        NavigationComponent,
    ],
    exports: [
        NavigationComponent,
    ]
})
export class NavigationModule {

}
