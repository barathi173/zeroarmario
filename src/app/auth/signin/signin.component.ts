import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { FormControl, FormGroup , Validators} from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form = new FormGroup( {
    Emailadd: new FormControl('',[Validators.required])
  })

  fieldTextType: boolean;
  constructor(public auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  move(){
    this.router.navigate(['signup'])
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  
    
}

