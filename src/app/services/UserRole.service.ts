import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import { AsyncRepository } from "src/app/Repositories/AsyncRepository";

@Injectable()
export class UserRoleService extends AsyncRepository {
  private url: string;
  constructor(private httpClient: HttpClient,private toasterService: ToastrService) { super("api/UserRole", httpClient, toasterService );}

  GetUserRolesByCreatorId(userId: string): any {
    this.url = `${this.api_url}/UserId/${userId}`;
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.url).subscribe((response: any) => {
        this.onItemsChange.next(response);
        resolve(response);
      }, reject);
    });
  }
}
