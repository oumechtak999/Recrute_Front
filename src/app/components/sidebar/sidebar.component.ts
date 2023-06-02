import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/Authentications/Authentication.service';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;

}

export let ROUTES: RouteInfo[] = [];

export let ROUTESADMIN: RouteInfo[] = [
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, DoCheck {
  public myprofilItems: any;
  public menuItems: any[];
  public isCollapsed = true;
  displaymenu = false;

  displayUser = false;

  currentrole: any;

  constructor(private service: AuthenticationService, private router: Router) {
  }

  ngDoCheck(): void {
    //if (this.router.url == '/login') {
      //this.displaymenu = false;
    //} else {
      //this.displaymenu = true;
    //}
  }

  ngOnInit(): void {
    //this.menuItems = ROUTES.filter(menuItem => menuItem);
   /* this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.service.updatemenu.subscribe(res => {
      this.MenuDisplay();
      this.LoadMenu();
    });
    this.MenuDisplay();
    this.LoadMenu();*/
  }
/*
  MenuDisplay() {
    if (this.service.GetToken() != '') {
      this.currentrole = this.service.GetRolebyToken(this.service.GetToken());

      this.displayUser = (this.currentrole == 'Creator' || this.currentrole == 'Reader');

    }
  }

  LoadMenu() {
    if (this.service.GetToken() != '') {
      this.currentrole = this.service.GetRolebyToken(this.service.GetToken());

    //  if (this.currentrole == 'Department') {
      //  ROUTES = ROUTESUSER;
       // this.menuItems = ROUTES.filter(menuItem => menuItem);
      //}


      if (this.currentrole == 'Admin') {
        ROUTES = ROUTESADMIN;
        this.menuItems = ROUTES.filter(menuItem => menuItem);
      }

    }
  }*/
}
