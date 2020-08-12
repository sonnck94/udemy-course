import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, AuthResData } from './auth.service';
import { User } from './user.model';
import { Subscription, Observable } from 'rxjs';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit{
    @ViewChild('authForm') authForm: NgForm;

    isLoginMode: boolean = true;
    error = null;
    authObs: Observable<AuthResData>;

    constructor(private authService: AuthService,
        private router: Router){}

    ngOnInit(){
        setTimeout(() =>{
            this.authForm.setValue({
                email: 'dangngocson94@gmail.com',
                password: '123456',
            })
        })
    }    
    onSubmit(authForm: NgForm){
        if(this.isLoginMode){
            this.authObs = this.authService.logIn(authForm.value.email, authForm.value.password);
        }else{
            this.authObs = this.authService.signUp(authForm.value.email, authForm.value.password);
        }
        this.authObs.subscribe(
            data => {
                console.log(data);
                this.router.navigate(['/recipes']);
            },
            err => {
                this.error = err;
            }
        )
    }    
    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }
}