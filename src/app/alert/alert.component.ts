import { Component, OnInit , Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
    selector:'app-dialog',
    template:`
        <div>
            <p> {{message}} </p>
        </div>
        <div>
        <button *ngIf='data.showCancel' mat-button (click)="onNoClick()">Ok</button>
        <button *ngIf='data.showBtn' mat-button (click)="onNoClick()">Cancel</button>
        <button *ngIf='data.showBtn' mat-button [mat-dialog-close]="data.message" cdkFocusInitial>Ok</button>
        </div>
    `,
    styleUrls:['./alert.css']
})
export class AlertComponent implements OnInit{
    public message;
    constructor(public dialogRef: MatDialogRef<AlertComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any){
           // console.log('--------------AlertComponent------------', data)
            this.message = data.message;
        }
    ngOnInit(): void {

        console.log('-----------------------Changes 1--------------')
        console.log('-----------------------Changes 1--------------')
        console.log('-----------------------Changes 1--------------')
        console.log('-----------------------Changes 1--------------')
        console.log('-----------------------Changes 1--------------')

        console.log('-----------------------Changes 1--------------')
        console.log('-----------------------Changes 1--------------')
        console.log('-----------------------Changes 1--------------')
        console.log('-----------------------Changes 1--------------')
        console.log('-----------------------Changes 1--------------')

        console.log('-----------------------Changes 1--------------')
        console.log('-----------------------Changes 1--------------')
        console.log('-----------------------Changes 1--------------')
        console.log('-----------------------Changes 1--------------')
        console.log('-----------------------Changes 1--------------')

        console.log('-----------------------Changes 1--------------')
        console.log('-----------------------Changes 1--------------')
        console.log('-----------------------Changes 1--------------')
        console.log('-----------------------Changes 1--------------')
        console.log('-----------------------Changes 1--------------')
    }
    

    onNoClick(): void {
        this.dialogRef.close();
      }

}