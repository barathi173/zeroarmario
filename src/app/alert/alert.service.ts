import {  Injectable } from '@angular/core';
import  {AlertComponent} from './alert.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
@Injectable({
    providedIn:'root'
})
export class AlertService {
    constructor(public dialog: MatDialog){}
    ngOnInit(): void {
    }
    public  openDialog(data): void {
        this.dialog.open(AlertComponent, {
           width: '250px',
           data
         });
       }
}