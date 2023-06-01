import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/app/config/environment";
import { AsyncRepository } from "src/app/Repositories/AsyncRepository";

@Injectable()
export class RoleService extends AsyncRepository {
  private url: string;

  constructor(private httpClient: HttpClient,private toasterService: ToastrService) { super("api/Role", httpClient, toasterService );}

  GetRoleByServiceIdDivisionId(serviceId: string,elementId: string): any {
    this.url = `${this.api_url}/ServiceIdElementId/${serviceId}/${elementId}`;
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.url).subscribe((response: any) => {
        this.onItemsChange.next(response);
        resolve(response);
      }, reject);
    });
  }
}
