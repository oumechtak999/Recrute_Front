import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';




import {ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

import {Location} from '@angular/common';




import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../../../Shared/dialog.service';
import { OffreCandidatService } from 'src/app/services/OffreCandidat/OffreCandidat.service';
import { CvService } from 'src/app/services/Cv/Cv.service';
import { AuthenticationService } from 'src/app/services/Authentications/Authentication.service';
import { AdminService } from 'src/app/services/Admin/Admin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-AdminPage',
  templateUrl: './AdminPage.component.html',
  styleUrls: ['./AdminPage.component.css'],
})
export class AdminPageComponent implements OnInit {

  
  offreCandidats: any[];
  Cvs: any[];
  pdfsrc: any;
  public searchNameUser = '';
  public activeModal: NgbActiveModal;
 
  configPagination = {
    itemsPerPage: 0,
    currentPage: 0,
    totalItems: 0

  };
  configPaginationRoles: any;
  public showRoles = true;
  admins: any[];
  public searchCandidat = '';
  public CandidatCol = '';

  constructor(
              private offreCandidatService: OffreCandidatService,
              private adminService: AdminService,
              private cvService: CvService,
              private fb: FormBuilder,
              private modalService: NgbModal, public dialog: MatDialog,
              private dialogService: DialogService,
              private location: Location,
              private config: NgbModalConfig, private service: AuthenticationService, private route: Router) {
    config.backdrop = false;
  }

  async ngOnInit() {

    // this.activeModal = new NgbActiveModal();
    this.offreCandidats = await this.offreCandidatService.GetAllAsync();
    console.log(this.offreCandidats);

    this.configPagination = {
      itemsPerPage: 3,
      currentPage: 1,
      totalItems: this.offreCandidats.length
    };
  }

  pageChanged(event) {
    this.configPagination.currentPage = event;
  }
  async  logout() {
    
 
  this.service.Logout();
    
   }
  async OpenCv(id: string) {
    this.Cvs= await this.cvService.GetByIdAsync(id);
    this.pdfsrc = this.Cvs[0].path.replace(/^.*src/, '../../../..');
    window.open(this.pdfsrc, '_blank');
  }


 
  async deleteCandidature(id: string) {
    this.dialogService.openConfirmDialog('Êtes-vous sûr que vous avez supprimer cette condidature ?')
      .afterClosed().subscribe(async res => {
      if (res) {
        await this.offreCandidatService.DeleteAsync(id);
        window.location.reload();

      }
    });

  }

 
 

 

}
