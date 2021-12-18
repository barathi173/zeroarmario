import { Injectable } from '@angular/core';
import {CanActivate,Router} from '@angular/router'
import { threadId } from 'worker_threads';

@Injectable({
    providedIn : 'root'
})
export class AdminAuthLoginService implements CanActivate{
    constructor(public router : Router){

    }
    canActivate(): boolean | any{
        let token = localStorage.getItem('user-token');
        if(token){
            this.router.navigate(['admin/dashboard']);
            return true;
        }
        this.router.navigate(['/admin-login']);
        return false;
    }
}