import {Component, OnInit, Input, ViewChild} from '@angular/core';

import {FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';

import {DataManager, ODataV4Adaptor, Query} from '@syncfusion/ej2-data';
import {ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

import {Location} from '@angular/common';


import {MatDialog} from '@angular/material/dialog';


import {MatTreeFlatDataSource, MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {Router} from '@angular/router';


import { OffreService } from 'src/app/services/Offre/Offre.service';
import { FileUploadService } from 'src/app/services/FileUpload/FileUpload.service';
import { DialogService } from 'src/app/Shared/dialog.service';
import { UploadService } from 'src/app/services/Upload/Upload.service';
import { Candidat } from 'src/app/models/Candidat.model';


@Component({
  selector: 'app-user-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']

})
export class HomeComponent implements OnInit {
  
  today = new Date().toLocaleDateString();

  //.replace(/ GMT.*^/, '');
  constructor(
    private offreService: OffreService,
    
    private fileUploadService: FileUploadService,
              private fb: FormBuilder,
              private modalService: NgbModal, public dialog: MatDialog,
              private dialogService: DialogService,
              private location: Location,
              private config: NgbModalConfig, private route: Router, private uploadService: UploadService) {
    config.backdrop = false;
  }
  candidat: Candidat = null;
  file: any;
  uploadFile: File | null;
  uploadFileLabel: string | undefined = 'Choose an image to upload';
  uploadProgress: number;
  uploadUrl: string;
  resultUpload: any;
  configPagination = {
    itemsPerPage: 0,
    currentPage: 0,
    totalItems: 0

  };
  offres: any[];
  myCandidatForm: FormGroup;
  async ngOnInit() {
    // this.typeUser = sessionStorage.getItem('userType');
     // this.activeModal = new NgbActiveModal();
 
     this.offres = await this.offreService.GetAllAsync();
     console.log(this.offres);
     this.configPagination = {
        itemsPerPage: 8,
        currentPage: 1,
        totalItems: this.offres.length
  
      }; 
   }
   pageChanged(event) {
    this.configPagination.currentPage = event;
  }
  getCandidatForm() {
    this.myCandidatForm = this.fb.group({
      nom  : [, Validators.required],
      prenom  : [, Validators.required],
      email : [, [Validators.required,Validators.email]],
      cIN : [, Validators.required],
      telephone : [, Validators.required],
      niveauEtude : [, [Validators.required]],
      dernierEmployeur  : [, [Validators.required]],
      anneesExperience : [, [Validators.required]],
      path: [, [Validators.required]],
    });
  }
  get registerFormControl() {
    return this.myCandidatForm.controls;
  }
  async openWriteCandidat(content) {

    this.modalService.open(content);
    this.getCandidatForm();

  }
  async putCandidat(form: FormGroup) {
    this.candidat = new Candidat();
    this.candidat.nom = form.value.nom;
    this.candidat.telephone = form.value.telephone;
    this.candidat.prenom = form.value.prenom;
    this.candidat.niveauEtude = form.value.niveauEtude;
    this.candidat.cIN = form.value.cIN;
    this.candidat.email = form.value.email;
    this.candidat.dernierEmployeur = form.value.dernierEmployeur;
    this.candidat.anneesExperience = form.value.anneesExperience;
    console.log(this.candidat);
    console.log(form.value);
  }
  async putOffreCandidat(form: FormGroup) {
   // console.log(form);
    await this.putCandidat(form);
   /* this.element = new Element();
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
    window.location.reload();*/
    console.log("bravoooooooooooooooooooooo");
  }
   /*
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
  async deleteElement(id: string) {
    this.dialogService.openConfirmDialog('Êtes-vous sûr de supprimer cet element ?')
      .afterClosed().subscribe(async res => {
      if (res) {
      //  await this.elementService.DeleteAsync(id);
        window.location.reload();
      }
    });

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
*/
async postuler(form: FormGroup) {
  this.modalService.dismissAll();
  
  this.dialogService.openConfirmDialog('Êtes-vous sûr que vous avez postuler cet offre ?')
    .afterClosed().subscribe(async res => {
    if (res) {
      await this.putOffreCandidat(form);
      //window.location.reload();
    }
  });

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
