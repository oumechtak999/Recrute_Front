import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthenticationService} from '../Authentications/Authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private inject: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authservice = this.inject.get(AuthenticationService);
    let jwtToken = req;
    jwtToken = this.AddTokenheader(req, authservice.GetToken());
    return next.handle(jwtToken).pipe(
      catchError(errordata => {
        if (errordata.status === 401) {
          authservice.Logout();
        }
        return throwError(errordata);
      })
    );
  }


  AddTokenheader(request: HttpRequest<any>, token: any) {
    return request.clone({headers: request.headers.set('Authorization', 'bearer ' + token)});
  }
}
