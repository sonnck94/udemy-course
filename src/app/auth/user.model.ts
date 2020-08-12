export class User{
    constructor(
        private email: string, 
        private id: string, 
        private _token: string, 
        private _tokenExpirationData: Date, 
    ){}

    getToken(){
        if(this._token && this._tokenExpirationData < new Date()){
            return null;
        }
        return this._token;
    }
}