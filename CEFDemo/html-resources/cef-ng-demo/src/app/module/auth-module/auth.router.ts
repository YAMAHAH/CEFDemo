import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';

export const authRouterConfig: Routes = [
    { path: '', redirectTo: "login", pathMatch: "full" },
    { path: 'login', component: LoginComponent, data: { one: 'one' } }
];
