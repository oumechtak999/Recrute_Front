import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/app/config/environment";

import { AsyncRepository } from "src/app/Repositories/AsyncRepository";

@Injectable()
export class OffreCandidatService extends AsyncRepository {

  constructor(private httpClient: HttpClient,private toasterService: ToastrService) { super("api/OffreCandidat", httpClient, toasterService );}

}
