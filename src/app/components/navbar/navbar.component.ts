import {Component, OnInit, ElementRef} from '@angular/core';

import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Router} from '@angular/router';
import {ROUTES} from '../sidebar/sidebar.component';
import {AuthenticationService} from '../../services/Authentications/Authentication.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  user: any[] = [];

  id: string;
  public location: Location;

  constructor(location: Location,
 private element: ElementRef, private router: Router, private service: AuthenticationService) {
    this.location = location;

  }

   async ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.id = sessionStorage.getItem('userid');
   
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  async  logout() {
   /*  if (this.service.GetRolebyToken(this.service.GetToken()) == 'Creator'||this.service.GetRolebyToken(this.service.GetToken()) == 'Reader') {
      this.router.navigate(['homePage']);
    } else if (this.service.GetRolebyToken(this.service.GetToken()) == 'Admin') {
    await  this.router.navigate(['Create-Users']);
    }
*/


 this.service.Logout();
   // await  sessionStorage.removeItem('token');
    //await  sessionStorage.clear();

    //localStorage.clear();
  //  this.router.navigate(['login']);
   // console.log("ggggggggggggggggggggggggg");
    //this.router.navigateByUrl('/login');
    //window.location.reload();
  }
}
