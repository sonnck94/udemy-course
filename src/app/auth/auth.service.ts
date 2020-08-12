import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';

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

    constructor(private http: HttpClient){
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
    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
      ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
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