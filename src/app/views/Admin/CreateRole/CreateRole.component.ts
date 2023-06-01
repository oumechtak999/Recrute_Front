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


@Component({
  selector: 'app-user-CreateRole',
  templateUrl: './CreateRole.component.html',
  styleUrls: ['./CreateRole.component.css'],
})
export class CreateRoleComponent implements OnInit {

  addValue = false;
  idRoleCreated: string;
  idUserRoleCreated: string;
  divisions: any[];
  pere: any[];
  public division: Element;
  services: any[];
  public service: Service;
  message = 'Hello!';
  public showRoleForm = true;
  roleForm: FormGroup;
  url: any;
  role: Role = null;
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

  constructor(private roleService: RoleService,
              private userService: UserService,
              private userRoleService: UserRoleService,
              private serviceService: ServiceService,
              private elementService: ElementService,
              private fb: FormBuilder,
              private modalService: NgbModal, public dialog: MatDialog,
              private dialogService: DialogService,
              private location: Location,
              private config: NgbModalConfig) {
    config.backdrop = false;
  }

  async ngOnInit() {

    // this.activeModal = new NgbActiveModal();

    this.users = await this.userService.GetAllAsync();
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

  async modifyUser(user: any) {
    await this.userService.UpdateAsync(user);

    window.location.reload();
  }

  async addRole(id: string) {


    const userRole = new UserRole();
    const rolesearch = await this.roleService.GetRoleByServiceIdDivisionId(this.service.id, this.division.id);

    console.log(rolesearch[0] == null);
    if (rolesearch[0] == null) {
      const role = new Role();
      role.elementId = this.division.id;
      role.serviceId = this.service.id;
      role.description = this.division.nom + this.service.nom;

      this.idRoleCreated = await this.roleService.CreateAsync(role);
      console.log(this.idRoleCreated);
      userRole.roleId = this.idRoleCreated;
      console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
      userRole.userId = id;
      this.idUserRoleCreated = await this.userRoleService.CreateAsync(userRole);
      console.log(this.idUserRoleCreated);
      this.getRoles(id);
      this.modalService.dismissAll();
    } else {
      userRole.roleId = rolesearch[0].id;
      console.log('sssssssssssssssssssssssssssssssss');
      userRole.userId = id;
      this.userRoles = await this.userRoleService.GetUserRolesByCreatorId(id);

      const first = this.userRoles.find((obj) => {
        return obj.role.description === rolesearch[0].description;
      });
      if (first != null) {
        alert('Ce role est dèja existe');
      } else {
        this.idUserRoleCreated = await this.userRoleService.CreateAsync(userRole);
        this.getRoles(id);
      }
      this.modalService.dismissAll();
      //console.log(this.idUserRoleCreated);
    }

  }

  async deleteUserRole(id: string) {
    this.dialogService.openConfirmDialog('Êtes-vous sûr d’annuler ce role ?')
      .afterClosed().subscribe(async res => {
      if (res) {
        // console.log(this.userRoles[0].userId);
        await this.userRoleService.DeleteAsync(id);
        this.getRoles(this.userRoles[0].userId);
      }
    });

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

  refresh() {
    window.location.reload();
  }

  toggleRoles() {
    this.showRoles = !this.showRoles;
  }

  async getRoles(id: string) {
    this.userRoles = await this.userRoleService.GetUserRolesByCreatorId(id);
    console.log(this.userRoles);
    this.configPaginationRoles = {
      itemsPerPage: 7,
      currentPage: 1,
      totalItems: this.userRoles.length
    };
    this.showRoles = false;
  }

  /*getRoleForm() {
    this.roleForm = this.fb.group({
      idDivision: [, Validators.required],
      idService: [, Validators.required],
    });
  }

  get registerFormControl() {
    return this.roleForm.controls;
  }

  async putRole(form: FormGroup) {
    this.role = new Role();
    this.role = form.value;

    console.log(this.role);
    this.idRoleCreated = await this.roleService.CreateAsync(this.role);
    console.log(this.idRoleCreated);
    window.location.reload();
  }
*/
  addDivisionId(division: Element): void {
    this.division = division;
    this.division.id = division.id;
    this.searchNameDevision = '';
  }

  addServiceId(service: Service): void {
    this.service = service;
    this.service.id = service.id;
    this.searchNameService = '';
  }

  async openWriteRole(content) {
    this.division = new Element();
    this.service = new Service();
    this.pere = await this.elementService.GetRoot();
    console.log(this.pere);
    this.divisions = await this.elementService.GetElementsByPereId(this.pere[0].id);
    this.services = await this.serviceService.GetAllAsync();
    console.log(this.services);
    //this.getRoleForm();
    this.modalService.open(content);
  }

  async openWriteUser(content, id: string) {
    this.userToModify = await this.userService.GetByIdAsync(id);
    this.userToModify[0].passwordHash=null;
    //this.getRoleForm();
    this.modalService.open(content);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
