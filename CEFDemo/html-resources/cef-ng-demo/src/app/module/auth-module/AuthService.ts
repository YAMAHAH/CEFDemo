import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {
    isLoggedIn: boolean;

    login(username: string, password: string): Promise<void> {
        this.isLoggedIn = true;
        return Promise.resolve();
    }
}