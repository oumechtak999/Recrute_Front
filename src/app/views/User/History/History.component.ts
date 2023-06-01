import {Component, OnInit, Input, Output} from '@angular/core';

import {FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';

import {DataManager, ODataV4Adaptor, Query} from '@syncfusion/ej2-data';
import {ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

import {Location} from '@angular/common';
import {Service} from '../../../models/Service.model';
import {Role} from '../../../models/Role.model';
import {Element} from '../../../models/Element.model';
import {RoleService} from '../../../services/Roles/Role.service';
import {UserService} from '../../../services/Users/User.service';
import {UserRoleService} from '../../../services/UserRole.service';
import {ServiceService} from '../../../services/Services/Service.service';
import {ElementService} from '../../../services/Elements/Element.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../../../Shared/dialog.service';
import {UserRole} from '../../../models/UserRole.model';
import {MatTreeFlatDataSource, MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {User} from '../../../models/User.model';
import {Router} from '@angular/router';
import {ElementsComponent} from '../Elements/Elements.component';
import {HomePageComponent} from '../HomePage.component';
import {DeleteRecursiveService} from '../../../services/DeleteRecursive/DeleteRecursive.service';


@Component({
  selector: 'app-user-History',
  templateUrl: './History.component.html',
  styleUrls: ['./History.component.css'],
})
export class HistoryComponent implements OnInit {
  @Input() ElementCol: string;
  @Input() searchElement: string;
 @Output() parent: HomePageComponent;
  title = 'angular-treeview';
  myElementForm: FormGroup;
  element: Element = null;
  elementToDisplay: any[];
  idElementCreated: string;
  indexCopierOrCouper = 0;
  idCouper: string;
  pere: any[];
  divisions: any[];
  elementDisplay: Element;
  public showfile = true;
  elementCopier: Element = null;
  public showFileInput = false;
  typeUser: string;
  userRoles: any[];
  configPagination: any;

  constructor(private roleService: RoleService,
              private userService: UserService,
              private userRoleService: UserRoleService,
              private serviceService: ServiceService,
              private elementService: ElementService,
              private fb: FormBuilder,
              private modalService: NgbModal, public dialog: MatDialog,
              private dialogService: DialogService,
              private location: Location, private deleteRecursiveService: DeleteRecursiveService,
              private config: NgbModalConfig, private route: Router) {
    config.backdrop = false;
  }



  async ngOnInit() {
this.get();
  }
async get(){
  this.divisions = await this.elementService.GetElementByIsDeleted();


  this.configPagination = {
    itemsPerPage: 7,
    currentPage: 1,
    totalItems: this.divisions.length
  };
}
  pageChanged(event) {
    this.configPagination.currentPage = event;
  }
  async deleteElement(id: string) {
    this.dialogService.openConfirmDialog('Êtes-vous sûr de supprimer cet element ?')
      .afterClosed().subscribe(async res => {
      if (res) {
        await this.deleteRecursiveService.DeleteAsync(id);
        this.get();
      }
    });

  }
  toggleHistory(){
    this.parent.getHistory();
  }
  async recoverElement(id: string) {
    const element = new Element();
    element.id = id;
    element.isDeleted = false;
    console.log(element);
    this.dialogService.openConfirmDialog('Êtes-vous sûr que vous voulez récupérer cet element ?')
      .afterClosed().subscribe(async res => {
      if (res) {
        await this.elementService.PatchAsyncIsDelete(element);
        window.location.reload();
        this.toggleHistory();
      }
  });

  }


}
