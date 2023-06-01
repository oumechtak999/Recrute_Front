import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ToastrService } from "ngx-toastr";

import { AsyncRepository } from "src/app/Repositories/AsyncRepository";

@Injectable()
export class EmailService extends AsyncRepository {

  constructor(private httpClient: HttpClient,private toasterService: ToastrService) { super("api/Mailing/send", httpClient, toasterService );}


}

