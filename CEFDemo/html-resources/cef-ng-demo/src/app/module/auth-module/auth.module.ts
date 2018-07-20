// Angular Imports
import { NgModule, ModuleWithProviders } from '@angular/core';

// This Module's Components
import { RouterModule } from '@angular/router';
import { authRouterConfig } from './auth.router';
import { LoginComponent } from './login.component';
import { AuthGuard } from './auth.guard';
import { FormsModule } from '@angular/forms';
import { AuthService } from "./AuthService";

export const AUTHPROVIDERS = [AuthGuard, AuthService];

@NgModule({
    imports: [
        FormsModule,
        RouterModule.forChild(authRouterConfig)
    ],
    declarations: [
        LoginComponent
    ],
    providers: []
})
export class AuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [...AUTHPROVIDERS]
        };
    }
}


