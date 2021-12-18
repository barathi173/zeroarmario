import { Directive, ElementRef,  HostListener } from '@angular/core';
@Directive({
    selector:'[appNumberOnly]'
})
export class NumberOnlyDirective{
    constructor(private  el : ElementRef){
        
    }
    @HostListener('keydown', ['$event']) onKeyDown(event) {
        let e = <KeyboardEvent> event;
        //console.log(e.keyCode)
       if([8,46, 36,37,38,39,40].includes(e.keyCode)){
           return;
       }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }
}