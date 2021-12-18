import { Injectable } from '@angular/core';
import {CanActivate,Router} from '@angular/router'

@Injectable({
    providedIn : 'root'
})
export class AdminAuthService implements CanActivate{
    constructor(public router : Router){

    }
    canActivate(): boolean | any{
        let token = localStorage.getItem('user-token');
        if(token){
            return true;
        }
        this.router.navigate(['/admin-login']);
        return false;
    }
}