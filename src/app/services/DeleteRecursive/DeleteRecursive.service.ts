import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/app/config/environment";
import { AsyncRepository } from "src/app/Repositories/AsyncRepository";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

export interface message {
  message: string,
  title: string,
  Succeed: boolean
}
@Injectable()
export class DeleteRecursiveService   {

  public api_url: string;
  public onItemsChange: BehaviorSubject<any>;
  public onItemChange: BehaviorSubject<any>;

  constructor( public _httpClient: HttpClient,private _toasterService: ToastrService) {
    this.onItemsChange = new BehaviorSubject([]);
    this.onItemChange = new BehaviorSubject([]);
    this.api_url = `${environment.baseUrl}/api/DeleteElement`;
}

  DeleteAsync(id: any): Promise<void> {
    return this._httpClient.delete(`${this.api_url}/${id}`)
      .toPromise()
      .then((res: any) => { // Success

          this.ShowMessage("Success",true);
        },
        () => { // Error
          this.ShowMessage("server is not responding",false);
        });
  }



  ShowMessage(message: any, isSuccess: any) {
    setTimeout(() => {
      if(isSuccess)
      {
        this._toasterService.success(message,'Success',{toastClass: 'toast ngx-toastr', closeButton: true});
      }
      else
      {
        this._toasterService.error(message,'Error',{toastClass: 'toast ngx-toastr', closeButton: true});
      }
    }, 1000);
  }
}
