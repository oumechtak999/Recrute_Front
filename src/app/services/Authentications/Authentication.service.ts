import {Injectable} from '@angular/core';
import {AsyncRepository} from '../../Repositories/AsyncRepository';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../config/environment';
import {BehaviorSubject, delay, Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()

export class AuthenticationService {
  private url: string;
  public onItemsChange: BehaviorSubject<any>;
  public onItemChange: BehaviorSubject<any>;
  tokenresp: any;
  private _updatemenu = new Subject<void>();
  get updatemenu() {
    return this._updatemenu;
  }
  constructor(private httpClient: HttpClient, private toasterService: ToastrService, private router: Router) {

    this.url = `${environment.baseUrl}/api/Account/authenticate`;
  }

  userAuthentication(entity: any): any {

    return new Promise((resolve, reject) => {
      (this.httpClient.post(this.url, entity)).subscribe((response: any) => {
        //this.onItemChange.next(response);
        resolve(response);
      }, reject);
    });

  }

  IsLoggedIn() {
    return sessionStorage.getItem('token') != null;
    //return localStorage.getItem('token') != null;

  }

  GetToken() {
    return sessionStorage.getItem('token') || '';
   // return localStorage.getItem('token') || '';
  }
 async Logout() {
    //alert('Your session expired');
   //this.router.navigateByUrl('/');

  await  sessionStorage.removeItem('token');

  await  sessionStorage.clear();
    console.log("fffffff");
    //localStorage.clear();

    //this.router.navigateByUrl('/login');
   window.location.reload();
  }
  GetRolebyToken(token: any) {
    let _token = token.split('.')[1];
    this.tokenresp = JSON.parse(atob(_token))
    return this.tokenresp.gender;
  }
  HaveAccess() {
    var loggintoken = sessionStorage.getItem('token') || '';
   // var loggintoken = localStorage.getItem('token') || '';
    var _extractedtoken = loggintoken.split('.')[1];
    var _atobdata = atob(_extractedtoken);
    var _finaldata = JSON.parse(_atobdata);
    if(_finaldata.gender=='admin'){
      return true
    }else{
      alert('you not having access');
      return false
    }
  }
}
