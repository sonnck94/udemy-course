import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './user.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

const FIREBASE_WEBKEY = 'AIzaSyCaa5bmclTXeFMyFCBIu2G5SEFUr9PPenA';
export interface AuthResData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean,
}

@Injectable({ providedIn: 'root' })
export class AuthService{
    user = new BehaviorSubject<User>(null);
    autoLogoutTimer: any;

    constructor(private http: HttpClient,
        private router: Router){
    }

    logIn(email, password){
        return this.http.post<AuthResData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_WEBKEY}`,{
            email: email,
            password: password,
            returnSecureToken: true,
        }).pipe(
            catchError(err => {
                return throwError(err);
            }),
            tap(resData => {
                this.handleAuthentication(
                  resData.email,
                  resData.localId,
                  resData.idToken,
                  +resData.expiresIn
                );
              })
        )
    }

    signUp(email: string, password: string){
        return this.http.post<AuthResData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_WEBKEY}`,{
            email: email,
            password: password,
            returnSecureToken: true,
        }).pipe(
            catchError(err => {
                return throwError(err)
            }),
            tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn,
                )
            })
        )
    }

    autoLogin(){
        const user = JSON.parse(localStorage.getItem('userData'));
        if(!user){
            return;
        }
        let _tokenExpirationDate = new Date(user._tokenExpirationDate)
        let loadedUser = new User(
            user.email,
            user.id,
            user._token,
            _tokenExpirationDate,
        );
        if(loadedUser.token){
            this.autoLogout(_tokenExpirationDate.getTime() - new Date().getTime());
            this.user.next(loadedUser);  
        }
    }

    autoLogout(expritionDuration: number){
        console.log("expritionDuration: ",expritionDuration);
        
        this.autoLogoutTimer = setTimeout(() => {
            this.logout();
        }, expritionDuration)
    }

    logout(){
        this.user.next(null);
        localStorage.removeItem('userData')
        if(this.autoLogoutTimer){
            clearTimeout(this.autoLogoutTimer);
            this.autoLogoutTimer = null;
        }
        this.router.navigate(['/auth']);
    }
    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
      ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.autoLogout(expiresIn * 1000);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
      }
    handleError(err){
        if(!err.error.error){
            return 'Unknow error occur!';
        }
        switch(err.error.error.message){
            case "EMAIL_NOT_FOUND":
                return "Email not found";
            case "EMAIL_EXISTS":
                return "Email existed";
            default:
                return 'Unknow error occur in swich!';
        }
    }
}