import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {ProductsService} from './products.service';
@Injectable({
    providedIn:'root'
})
export class GetProductService implements Resolve<any>{
    constructor(public product : ProductsService ){}
    resolve( route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) : any{
            let id = route.paramMap.get('id');
           return  this.product.getProductById(id);
    }
}