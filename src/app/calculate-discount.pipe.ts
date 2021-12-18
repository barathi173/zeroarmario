import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'calculatediscount'})
export class calculateDiscount implements PipeTransform {
  transform(value: number, percent = null): number {
    if(percent !== null){
        return Math.round( value - (value * percent) /100 );
    }
    return null;
  }
}