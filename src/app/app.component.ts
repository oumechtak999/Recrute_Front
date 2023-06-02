import { Component } from '@angular/core';
import {AuthenticationService} from './services/Authentications/Authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  constructor(private service: AuthenticationService, private route: Router) {
  }
  MenuDisplay() {
   
  }
}
