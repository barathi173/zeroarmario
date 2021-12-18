import { Component, OnInit } from '@angular/core';
import { ShiprocketService } from './shiprocket.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'zeroarmario';
  headerFooter: boolean;

  constructor( private ship: ShiprocketService ,
    private router: Router,
  ) { }



  ngOnInit(): void {
    // this.ship.login(),
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.headerFooter = (event.url.includes('admin') === false );
      }
    });
  }
}
