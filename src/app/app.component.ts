import { Component } from '@angular/core';
import {AuthenticationService} from './services/Authentications/Authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TE Connectivity';
  displaymenu = false;
  displayGH = false;
  displayUser = false;
  displayRH = false;
  currentrole: any;
  constructor(private service: AuthenticationService, private route: Router) {
  }
  MenuDisplay() {
    if (this.service.GetToken() != '') {
      this.currentrole = this.service.GetRolebyToken(this.service.GetToken());
      this.displayUser = this.currentrole == 'Department';
      this.displayRH = (this.currentrole == 'Department' || this.currentrole == 'RH');
      this.displayGH = this.currentrole == 'Guardhouse';
    }
  }
}
