import {Component, OnInit, VERSION} from '@angular/core';
import * as XLSX from 'xlsx';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {UserService} from '../../../services/Users/User.service';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Location} from '@angular/common';
import {User} from '../../../models/User.model';
import {Service} from '../../../models/Service.model';
import {ServiceService} from '../../../services/Services/Service.service';

import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../../../Shared/dialog.service';

@Component({
  selector: 'app-user-CreateService',
  templateUrl: './CreateService.component.html',
  styleUrls: ['./CreateService.component.css'],
})
export class CreateServiceComponent implements OnInit {
  config: any;
  addValue = false;
  idServiceCreated: string;


  message = 'Hello!';
  public showServiceForm = true;
  serviceForm: FormGroup;
  url: any;
  service: Service = null;
  public searchNameService = '';

  services :  any[] = [];
  configPagination: any;
  constructor(private serviceService: ServiceService,
              private fb: FormBuilder
    , private modalService: NgbModal,public dialog: MatDialog,
              private dialogService: DialogService,
              private location: Location) {
  }
  async ngOnInit() {


    this.getServiceForm();
    this.services= await this.serviceService.GetAllAsync();
    console.log(this.services);

    this.configPagination = {
      itemsPerPage: 7,
      currentPage: 1,
      totalItems: this.services.length
    };
  }
  pageChanged(event){
    this.configPagination.currentPage = event;
  }
  refresh() {
    window.location.reload();
  }

  getServiceForm() {
    this.serviceForm = this.fb.group({
      nom: [, Validators.required],
    });
  }

  get registerFormControl() {
    return this.serviceForm.controls;
  }

  async putService(form: FormGroup) {
    this.service = new Service();
    this.service = form.value;

    console.log(this.service);
    this.idServiceCreated = await this.serviceService.CreateAsync(this.service);
    console.log(this.idServiceCreated);
    window.location.reload();
  }
  async deleteService(id: string) {
    this.dialogService.openConfirmDialog('Êtes-vous sûr de supprimer ce service ?')
      .afterClosed().subscribe(async res => {
      if (res) {
        await this.serviceService.DeleteAsync(id);
        window.location.reload();
      }
    });

  }
}
