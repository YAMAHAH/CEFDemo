import { Component, OnInit, AfterViewInit, ElementRef, ViewContainerRef, EventEmitter, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { AuthService } from './AuthService';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

    ngOnInit() {

    }

    ngAfterViewInit() {

    }

    constructor(private authService: AuthService,
        private activeRoute: ActivatedRoute,
        private router: Router) {
        this.activeRoute
            .params
            .pipe(map(p => p['target']))
            .subscribe(url => {
                if (url) this.target = decodeURIComponent(url);
            });
    }

    exitLogin: boolean = false;
    isLogining: boolean = true;
    defaultPage: string = '/qk';
    target: string = null;

    login(event: Event, ngForm: NgForm): Observable<boolean> | boolean {
        event.preventDefault();
        if (ngForm.valid) {
            this.authService
                .login(ngForm.value.credentials.username, ngForm.value.credentials.password)
                .then(() => {
                    this.exitLogin = true;
                    this.locationToUrl(this.target, this.defaultPage);
                    return this.isLogining;
                });
        }
        return false;
    }

    locationToUrl(target: string, defaultPage: string) {
        this.router.navigateByUrl(target ? target : defaultPage, { skipLocationChange: true });
    }
}