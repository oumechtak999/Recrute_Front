import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/app/config/environment";
import { AsyncRepository } from "src/app/Repositories/AsyncRepository";

@Injectable()
export class ElementService extends AsyncRepository {
  private url: string;
  constructor(private httpClient: HttpClient,private toasterService: ToastrService) { super("api/Element", httpClient, toasterService );}


  GetElementsByPereId(pereId: string): any {
    this.url = `${this.api_url}/PereId/${pereId}`;
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.url).subscribe((response: any) => {
        this.onItemsChange.next(response);
        resolve(response);
      }, reject);
    });
  }
  GetByIdWithoutPeresAsync(id: any): any {
    return new Promise ((resolve, reject) => {
      (this._httpClient.get(`${this.api_url}/WithoutPeres/${id}`)).subscribe((response: any) => {
        this.onItemChange.next(response);
        resolve(response);
      }, reject);
    });
  }
  GetElementPereId(id: string): any {
    this.url = `${this.api_url}/GetPereId/${id}`;
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.url).subscribe((response: any) => {
        this.onItemsChange.next(response);
        resolve(response);
      }, reject);
    });
  }
  GetElementNom(id: string): any {
    this.url = `${this.api_url}/ElementNom/${id}`;
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.url).subscribe((response: any) => {
        this.onItemsChange.next(response);
        resolve(response);
      }, reject);
    });
  }
  GetElementByIsDeleted(): any {
    this.url = `${this.api_url}/IsDeleted`;
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.url).subscribe((response: any) => {
        this.onItemsChange.next(response);
        resolve(response);
      }, reject);
    });
  }
  GetRoot():any {
    this.url = `${this.api_url}/Root`;
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.url).subscribe((response: any) => {
        this.onItemsChange.next(response);
        resolve(response);
      }, reject);
    });
  }
  PatchAsyncIsDelete(entity: any): any {
    this.url = `${this.api_url}/IsDeleted`;
    return new Promise ((resolve, reject) => {
      (this._httpClient.patch(this.url, entity)).subscribe((response: any) => {
        this.onItemChange.next(response);
        resolve(response);
      }, reject);
    });
  }
}
