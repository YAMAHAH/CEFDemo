import { Routes } from "@angular/router";
import { PortalComponent } from './portal/PortalComponent';
import { AuthGuard } from './module/auth-module/auth.guard';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'qk', pathMatch: 'full' },
    {
        path: 'qk',
        component: PortalComponent,
        loadChildren: "./module/index-module/index.module#IndexModule",
        canActivate: [AuthGuard],
        data: { title: 'Index Module', preload: false }
    },
    {
        path: 'auth',
        loadChildren: "./module/auth-module/auth.module#AuthModule",
        data: { preload: false }
    },
    {
        path: "**",
        redirectTo: "/auth/login"
    }
];