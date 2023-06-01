import {Component, OnInit, Input, ViewChild} from '@angular/core';

import {FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';

import {DataManager, ODataV4Adaptor, Query} from '@syncfusion/ej2-data';
import {ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

import {Location} from '@angular/common';
import {Service} from '../../models/Service.model';
import {Role} from '../../models/Role.model';
import {Element} from '../../models/Element.model';
import {RoleService} from '../../services/Roles/Role.service';
import {UserService} from '../../services/Users/User.service';
import {UserRoleService} from '../../services/UserRole.service';
import {ServiceService} from '../../services/Services/Service.service';
import {ElementService} from '../../services/Elements/Element.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../../Shared/dialog.service';
import {UserRole} from '../../models/UserRole.model';
import {MatTreeFlatDataSource, MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {User} from '../../models/User.model';
import {Router} from '@angular/router';
import {FileUploadService} from '../../services/FileUpload/FileUpload.service';
import {UploadService} from '../../services/Upload/Upload.service';
import {ElementsComponent} from './Elements/Elements.component';
import { OffreService } from 'src/app/services/Offre/Offre.service';


@Component({
  selector: 'app-user-HomePage',
  templateUrl: './HomePage.component.html',
  styleUrls: ['./HomePage.component.css']

})
export class HomePageComponent implements OnInit {
  @ViewChild(ElementsComponent) child: ElementsComponent;
  title = 'angular-treeview';
  myElementForm: FormGroup;
  element: Element = null;
  idElementCreated: string;
  idElementColleted: string;
  indexCopierOrCouper = 0;
  typeUser: string;
  idCouper: string;
  pere: any[];
  divisions: any[];
  divisionsReader: Element[];
  elementCopier: any[];
  userRoles: any[];
  affichageId: string;
  public showFileInput = false;
  public history = true;
  public searchElement = '';
  public ElementCol = '';
  file: any;
  data: any[] = [];
  dataPeres: any[] = [];
  today = new Date().toLocaleDateString();

  //.replace(/ GMT.*^/, '');
  constructor(
    private offreService: OffreService,
    
    private roleService: RoleService,
              private userService: UserService,
              private userRoleService: UserRoleService,
              private serviceService: ServiceService,
              private elementService: ElementService,
              private fileUploadService: FileUploadService,
              private fb: FormBuilder,
              private modalService: NgbModal, public dialog: MatDialog,
              private dialogService: DialogService,
              private location: Location,
              private config: NgbModalConfig, private route: Router, private uploadService: UploadService) {
    config.backdrop = false;
  }

  // Nested Tree
  nestedDataSource = new MatTreeNestedDataSource<Element>();

  nestedTreeControl = new NestedTreeControl<Element>(node => node.peres);

  working = false;
  uploadFile: File | null;
  uploadFileLabel: string | undefined = 'Choose an image to upload';
  uploadProgress: number;
  uploadUrl: string;
  resultUpload: any;

  handleFileInput(files: FileList) {
    if (files.length > 0) {
      this.uploadFile = files.item(0);
      this.uploadFileLabel = this.uploadFile?.name;
    }
  }

  getHistory() {

    this.history = !this.history;
    console.log('ggggg');
  }

  async upload() {
    const formData = new FormData();

    formData.append(this.uploadFile.name, this.uploadFile);
    this.resultUpload = await this.uploadService.CreateAsync(formData);

  }

  async ngOnInit() {
    this.typeUser = sessionStorage.getItem('userType');
    // this.activeModal = new NgbActiveModal();
    this.pere = await this.elementService.GetRoot();
    this.divisions = await this.elementService.GetElementsByPereId(this.pere[0].id);


    this.userRoles = await this.userRoleService.GetUserRolesByCreatorId(sessionStorage.getItem('userid'));

    console.log(this.userRoles);
    //
    if (this.typeUser == 'Reader') {
      for (const userRole of this.userRoles) {
        for (const element of this.divisions) {

          if (element.id === userRole.role.element.id) {

            //this.divisions.splice(index, 1);
            this.data.push(element);

            //delete this.divisions[index];
            //console.log(this.divisions);
          }

        }


      }
      this.divisions = this.data.filter(
        (element, i) => i === this.data.indexOf(element)
      );
      console.log(this.divisions);
      this.divisions.forEach((element, index) => {

        this.dataPeres=[];
          element.peres.forEach((pere, indexpere) => {
              for (const userRole of this.userRoles) {
                if (pere.nom == userRole.role.service.nom) {
                  console.log(pere.nom+"====="+userRole.role.service.nom);
                  this.dataPeres.push(pere);


                }

              }

           element.peres= this.dataPeres;
            console.log(element.peres);

            }
          );

        }
      );

    }
    this.nestedDataSource.data = this.divisions;


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

  afficher(id: string) {
    if (this.history === false) {
      this.history = true;
    }
    this.child.afficher(id);

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
    window.location.reload();
  }

  getFile(event: any) {
    this.file = event.target.files[0].name;

    console.log(this.file);
  }

  async submitFile() {
    const formdata = new FormData();
    formdata.set('files', this.file);
    await this.fileUploadService.CreateAsync(formdata);

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
  }

  async coupercoller(id: string) {

    const elementColler = new Element();
    elementColler.id = this.idCouper;
    elementColler.pereId = id;
    await this.elementService.PatchAsync(elementColler);
    this.indexCopierOrCouper = 0;

  }

  async coller(id: string) {
    if (this.indexCopierOrCouper === 1) {
      await this.copiercoller(id);
    }
    if (this.indexCopierOrCouper === 2) {

      await this.coupercoller(id);
    }
    window.location.reload();
  }


  async putDivision(form: FormGroup) {
    this.element = new Element();
    this.element = form.value;
    console.log(this.element);
    this.element.type = 'Dossier';
    if(this.element.img!=null){
      const formData = new FormData();
      formData.append(this.uploadFile.name, this.uploadFile);
      this.resultUpload = await this.uploadService.CreateAsync(formData);
      console.log(this.resultUpload[0].url);
      this.element.img = this.resultUpload[0].url.replace(/^.*src/, '../../../..');
    }
    this.element.pereId = this.pere[0].id;
    this.element.createurId = sessionStorage.getItem('userid');
    let nameElements = await this.elementService.GetElementsByPereId(this.pere[0].id);


    for (const element of nameElements) {

      if (element.nom === this.element.nom) {
        this.element.nom = this.element.nom + this.today;
        break;
      }

    }
    console.log(this.element);

    this.idElementCreated = await this.elementService.CreateAsync(this.element);
    console.log(this.idElementCreated);
    window.location.reload();

  }

  async deleteElement(id: string) {
    this.dialogService.openConfirmDialog('Êtes-vous sûr de supprimer cet element ?')
      .afterClosed().subscribe(async res => {
      if (res) {
        await this.elementService.DeleteAsync(id);
        window.location.reload();
      }
    });

  }

  async openWriteElement(content) {

    this.modalService.open(content);
    this.getElementForm();

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
