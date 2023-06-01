import {Component, OnInit, Input} from '@angular/core';

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
import {EmailService} from 'src/app/services/Email/Email.service';
import {Email} from 'src/app/models/Email.model';
import {UploadService} from '../../../services/Upload/Upload.service';


@Component({
  selector: 'app-user-Elements',
  templateUrl: './Elements.component.html',
  styleUrls: ['./Elements.component.css'],
})
export class ElementsComponent implements OnInit {

  @Input() ElementCol: string;
  @Input() searchElement: string;
  @Input() affichageId: string;

  title = 'angular-treeview';
  myElementForm: FormGroup;
  myEmailForm: FormGroup;

  element: Element = null;
  elementToDisplay: any[] = [];
  idElementCreated: string;
  indexCopierOrCouper = 0;
  pdfsrc: any;
  idCouper: string;
  pere: any[];
  divisions: any[];
  elementDisplay: Element;
  public showfile = true;
  elementCopier: Element = null;
  pathSendEmail: string;
  typeUser: string;
  path = '';
  userRoles: any[];
  public showFileInput = false;
  working = false;
  uploadFile: File | null;
  uploadFileLabel: string | undefined = 'Choose an image to upload';
  uploadProgress: number;
  uploadUrl: string;
  resultUpload: any;
  pereid: string;
  configPagination = {
    itemsPerPage: 0,
    currentPage: 0,
    totalItems: 0

  };
  breakpoint: number;
  today = new Date();
  data: any[] = [];

  constructor(private roleService: RoleService,
              private userService: UserService,
              private userRoleService: UserRoleService,
              private serviceService: ServiceService,
              private elementService: ElementService,
              private fb: FormBuilder,
              private modalService: NgbModal, public dialog: MatDialog,
              private dialogService: DialogService,
              private location: Location,
              private emailService: EmailService,
              private config: NgbModalConfig, private route: Router, private uploadService: UploadService) {
    config.backdrop = false;
  }

  // Nested Tree
  nestedDataSource = new MatTreeNestedDataSource<Element>();

  nestedTreeControl = new NestedTreeControl<Element>(node => node.peres);

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }

  async ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
    this.typeUser = sessionStorage.getItem('userType');
    // this.activeModal = new NgbActiveModal();
    this.pere = await this.elementService.GetRoot();
    this.divisions = await this.elementService.GetElementsByPereId(this.pere[0].id);
    this.userRoles = await this.userRoleService.GetUserRolesByCreatorId(sessionStorage.getItem('userid'));
    this.nestedDataSource.data = this.divisions;
    if (this.typeUser == 'Reader') {
      this.divisions.forEach((element, index) => {
          for (const userRole of this.userRoles) {
            if (element.nom === userRole.role.element.nom) {
              //this.divisions.splice(index, 1);
              this.data.push(element);
            }

          }
        }
      );
      this.divisions = this.data.filter(
        (element, i) => i === this.data.indexOf(element)
      );
      console.log(this.divisions);
    }
    console.log(this.nestedDataSource);

    this.configPagination = {
      itemsPerPage: 8,
      currentPage: 1,
      totalItems: this.divisions.length

    };
  }

  pageChanged(event) {
    this.configPagination.currentPage = event;
  }

  hasNestedChild(index: number, node: Element) {
    return node?.peres?.length > 0;
  }

  togglefile(form: FormGroup) {
    if (form.value.type === 'Fichier') {
      this.showFileInput = !this.showFileInput;
      console.log(this.showFileInput);
    }
  }

  handleFileInput(files: FileList) {
    if (files.length > 0) {
      this.uploadFile = files.item(0);
      this.uploadFileLabel = this.uploadFile?.name;
    }
  }


  async upload() {
    const formData = new FormData();

    formData.append(this.uploadFile.name, this.uploadFile);
    this.resultUpload = await this.uploadService.CreateAsync(formData);

  }

  async back() {

    if (this.elementToDisplay.length > 0) {
      let result = await this.elementService.GetElementPereId(this.elementToDisplay[0].id);
      console.log(result);
      if (result[0].pereId != null) {
        if (result[0].pereId === this.pere[0].id) {
          this.divisions = await this.elementService.GetElementsByPereId(this.pere[0].id);
          this.path="";
        } else {
          this.afficher(result[0].pereId);
          this.showfile = true;
        }
      }

    }

  }

  async afficher(id: string) {
    console.log(this.path);
    this.elementToDisplay = await this.elementService.GetByIdWithoutPeresAsync(id);
    console.log(this.elementToDisplay.length);
    if (this.elementToDisplay[0].type === 'Dossier') {
      this.divisions = await this.elementService.GetElementsByPereId(id);

      if (this.typeUser === 'Reader') {
        this.data = [];
        console.log(this.elementToDisplay[0].pereId + '===' + this.pere[0].id);
        if (this.elementToDisplay[0].pereId === this.pere[0].id) {
          console.log('ghghghghgh');

          this.divisions.forEach((element, index) => {
              for (const userRole of this.userRoles) {
                console.log(element.nom + '===' + userRole.role.service.nom);
                if (element.nom === userRole.role.service.nom) {
                  //this.divisions.splice(index, 1);
                  this.data.push(element);

                }

              }
            }
          );
          this.divisions = this.data;
        }

      }

      this.configPagination = {
        itemsPerPage: 8,
        currentPage: 1,
        totalItems: this.divisions.length

      };
      this.showfile = true;
    } else if (this.elementToDisplay[0].type === 'Fichier') {
      this.pathSendEmail = this.elementToDisplay[0].path;
      this.pdfsrc = this.elementToDisplay[0].path.replace(/^.*src/, '../../../..');
      console.log(this.pdfsrc);
      this.showfile = false;


    }
    this.path="";
    let elementPath= await this.elementService.GetElementNom(id);
    this.getPath(elementPath[0]);
  }


  async getElements(id: string) {

    this.elementToDisplay = await this.elementService.GetByIdWithoutPeresAsync(id);
    console.log(this.elementToDisplay.length);
    if (this.elementToDisplay[0].type === 'Dossier') {
      this.divisions = await this.elementService.GetElementsByPereId(id);
      if (this.typeUser == 'Reader') {
        if (this.elementToDisplay[0].pereId === this.pere[0].id) {


          this.divisions.forEach((element, index) => {
              for (const userRole of this.userRoles) {
                if (element.nom !== userRole.role.service.nom) {
                  //this.divisions.splice(index, 1);
                  delete this.divisions[index];
                }

              }
            }
          );
        }
      }

      this.configPagination = {
        itemsPerPage: 8,
        currentPage: 1,
        totalItems: this.divisions.length

      };
    }
    if (this.elementToDisplay[0].type === 'Fichier') {
      this.pathSendEmail = this.elementToDisplay[0].path;
      this.pdfsrc = this.elementToDisplay[0].path.replace(/^.*src/, '../../../..');
      this.showfile = false;
    }

  }

  getElementForm() {
    this.myElementForm = this.fb.group({
      nom: [, Validators.required],
      titre: [, Validators.required],
      description: [, [Validators.required]],
      date: [, Validators.required],
      img: [, Validators.required],
      type: [, [Validators.required]],
      path: [, [Validators.required]],
    });
  }

  get registerFormControl() {
    return this.myElementForm.controls;
  }

  getEmailForm() {
    this.myEmailForm = this.fb.group({
      toEmail: [, [Validators.required, Validators.email]],
      subject: [, Validators.required],
      body: [, [Validators.required]]
    });
  }

  get registerEmailFormControl() {
    return this.myEmailForm.controls;
  }


  async putElement(form: FormGroup, id: string) {
    this.element = new Element();
    this.element = form.value;
    this.element.pereId = id;
    if (this.element.type === 'Fichier') {
      const formData = new FormData();

      formData.append(this.uploadFile.name, this.uploadFile);
      this.resultUpload = await this.uploadService.CreateAsync(formData);

      console.log(this.resultUpload[0].url);


      this.element.path = this.resultUpload[0].url;
    }

    this.element.createurId = sessionStorage.getItem('userid');
    console.log(this.element);
    let nameElements = await this.elementService.GetElementsByPereId(id);
    for (const element of nameElements) {
      if (element.nom === this.element.nom) {
        this.element.nom = this.element.nom + this.today;
        break;
      }
    }
    this.idElementCreated = await this.elementService.CreateAsync(this.element);
    console.log(this.idElementCreated);
    // this.route.navigate(['Create-Role']);
    // window.location.reload();
    this.afficher(id);
    this.modalService.dismissAll();
  }


  async copier(id: string) {
    this.indexCopierOrCouper = 1;

    this.elementCopier = await this.elementService.GetByIdAsync(id);
    console.log(this.elementCopier);
  }

  couper(id: string) {
    this.indexCopierOrCouper = 2;
    this.idCouper = id;
  }

  async copiercoller(id: string) {

    this.elementCopier[0].pereId = id;
    this.elementCopier[0].createurId = sessionStorage.getItem('userid');
    let nameElements = await this.elementService.GetElementsByPereId(id);
    for (const element of nameElements) {
      if (element.nom === this.elementCopier[0].nom) {
        this.elementCopier[0].nom = this.elementCopier[0].nom + this.today;
        break;
      }
    }
    await this.elementService.CreateAsync(this.elementCopier[0]);
    this.indexCopierOrCouper = 0;
    this.afficher(id);
  }

  async coupercoller(id: string) {

    const elementColler = new Element();
    elementColler.id = this.idCouper;
    elementColler.pereId = id;
    await this.elementService.PatchAsync(elementColler);
    this.indexCopierOrCouper = 0;
    this.afficher(id);

  }

  async coller(id: string) {
    if (this.indexCopierOrCouper === 1) {
      await this.copiercoller(id);
    }
    if (this.indexCopierOrCouper === 2) {

      await this.coupercoller(id);
    }
  }

  async getPath(element: any) {
    if (this.path ==="") {
      this.path = element.nom + this.path;
    }else{this.path = element.nom + '/' + this.path;}

    if (element.pere != null) {
      this.getPath(element.pere);
    }
  }

  async sendEmail(form: FormGroup) {

    let email = new Email();
    email = form.value;
    email.path = this.pathSendEmail;
    console.log(email);
    await this.emailService.CreateAsync(email);
    alert('Email envoyé !!');
    this.modalService.dismissAll();

  }

  async putDivision(form: FormGroup) {
    this.element = new Element();
    this.element = form.value;
    this.element.type = 'Dossier';

    this.element.pereId = this.pere[0].id;
    this.element.createurId = sessionStorage.getItem('userid');
    console.log(this.element);

    let nameElements = await this.elementService.GetElementsByPereId(this.pere[0].id);
    for (const element of nameElements) {
      if (element.nom === this.element.nom) {
        this.element.nom = this.element.nom + this.today;
        break;
      }
    }
    this.idElementCreated = await this.elementService.CreateAsync(this.element);
    console.log(this.idElementCreated);

    window.location.reload();

  }

  async deleteElement(id: string) {
    this.dialogService.openConfirmDialog('Êtes-vous sûr de supprimer cet element ?')
      .afterClosed().subscribe(async res => {
      if (res) {
        let pereid = await this.elementService.GetElementPereId(id);
        await this.elementService.DeleteAsync(id);

        console.log(pereid);
        this.afficher(pereid[0].pereId);
      }
    });

  }

  async openWriteElement(content) {

    this.modalService.open(content);
    this.getElementForm();

  }

  async openSendEmail(content) {

    this.modalService.open(content);
    this.getEmailForm();

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
