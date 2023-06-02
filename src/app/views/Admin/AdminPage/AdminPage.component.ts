import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';


import {UserService} from '../../../services/Users/User.service';

import {ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

import {Location} from '@angular/common';

import {Service} from '../../../models/Service.model';
import {RoleService} from '../../../services/Roles/Role.service';
import {ElementService} from '../../../services/Elements/Element.service';
import {Element} from '../../../models/Element.model';
import {UserRole} from '../../../models/UserRole.model';
import {Role} from '../../../models/Role.model';
import {ServiceService} from '../../../services/Services/Service.service';
import {UserRoleService} from '../../../services/UserRole.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../../../Shared/dialog.service';
import { OffreCandidatService } from 'src/app/services/OffreCandidat/OffreCandidat.service';
import { CvService } from 'src/app/services/Cv/Cv.service';


@Component({
  selector: 'app-user-AdminPage',
  templateUrl: './AdminPage.component.html',
  styleUrls: ['./AdminPage.component.css'],
})
export class CreateRoleComponent implements OnInit {

  
  offreCandidats: any[];
  
  public searchNameUser = '';
  public activeModal: NgbActiveModal;
  users: any[] = [];
  userToModify: any[];
  configPagination = {
    itemsPerPage: 0,
    currentPage: 0,
    totalItems: 0

  };
  configPaginationRoles: any;
  public showRoles = true;
  userRoles: any[];
  public searchNameDevision = '';
  public searchNameService = '';

  constructor(
              private offreCandidatService: OffreCandidatService,
              private cvService: CvService,
              private fb: FormBuilder,
              private modalService: NgbModal, public dialog: MatDialog,
              private dialogService: DialogService,
              private location: Location,
              private config: NgbModalConfig) {
    config.backdrop = false;
  }

  async ngOnInit() {

    // this.activeModal = new NgbActiveModal();

    this.offreCandidats = await this.userService.GetAllAsync();
    console.log(this.users);

    this.configPagination = {
      itemsPerPage: 3,
      currentPage: 1,
      totalItems: this.users.length
    };
  }

  pageChanged(event) {
    this.configPagination.currentPage = event;
  }

  


 
  async deleteUser(id: string) {
    this.dialogService.openConfirmDialog('Êtes-vous sûr de supprimer cet utilisateur ?')
      .afterClosed().subscribe(async res => {
      if (res) {
        await this.userService.DeleteAsync(id);
        window.location.reload();

      }
    });

  }

 
 

 

}
