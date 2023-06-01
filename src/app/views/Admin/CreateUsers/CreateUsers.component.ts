import {Component, OnInit, VERSION} from '@angular/core';
import * as XLSX from 'xlsx';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/Users/User.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import {User} from '../../../models/User.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-CreateUsers',
  templateUrl: './CreateUsers.component.html',
  styleUrls: ['./CreateUsers.component.css'],
})
export class CreateUsersComponent implements OnInit {
  config: any;
  addValue = false;
  collection = {count: 60, data: []};
  name = 'Angular ' + VERSION.major;
  public tableData: any;
  public tableTitle: any;
  public customPagination = 1;
  public recordsPerPage = 10;
  public tableRecords = [];
  public pageStartCount = 0;
  public pageEndCount = 10;
  public totalPageCount = 0;
  public currentPage = 0;
  idUserCreated: string;


  message = 'Hello!';
  public showUserForm = true;
  myUserForm: FormGroup;
  url: any;
  user: User = null;
  idPTWHCreated: string;

  constructor(private userService: UserService,
              private fb: FormBuilder
    , private modalService: NgbModal,
              private location: Location, private route: Router) {
    for (var i = 0; i < this.collection.count; i++) {
      this.collection.data.push(
        {
          id: i + 1,
          value: 'items number ' + (i + 1)
        }
      );
    }

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  async ngOnInit() {


    this.getUserForm();

  }
  refresh(){
    window.location.reload();
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }

  public uploadData(e) {
    this.addValue = true;
    console.log(e.target.files[0]);
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(<unknown>event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, {type: 'binary'});

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      console.log(data); // Data will be logged in array format containing objects
      this.tableData = data;
      this.tableTitle = Object.keys(this.tableData[0]);
      this.tableRecords = this.tableData.slice(
        this.pageStartCount,
        this.pageEndCount
      );
      this.totalPageCount = this.tableData.length / this.recordsPerPage;
    };
  }

  async saveUser() {
    for (var i = this.tableData.length - 1; i >= 0; i--) {
      this.tableData[i].cin = String(this.tableData[i].cin);
      this.tableData[i].tele = String(this.tableData[i].tele);
      console.log(this.tableData[i]);
      this.idUserCreated = await this.userService.CreateAsync(this.tableData[i]);
      console.log('User ok');

    }
    window.location.reload();
  }

  onPageChange() {
    this.pageStartCount = this.currentPage * this.recordsPerPage;
    this.pageEndCount = this.pageStartCount + this.recordsPerPage;
    this.tableRecords = this.tableData.slice(
      this.pageStartCount,
      this.pageEndCount
    );
  }


  getUserForm() {
    this.myUserForm = this.fb.group({
      nom: [, Validators.required],
      prenom: [, [Validators.required]],
      cin: [, Validators.required],
      email: [, [Validators.required]],
      phoneNumber: [, Validators.required],
      userType: [, [Validators.required]],
      userName: [, Validators.required],
      passwordHash: [, [Validators.required]],
    });
  }

  get registerFormControl() {
    return this.myUserForm.controls;
  }

  async putUser(form: FormGroup) {
    this.user = new User();
    this.user = form.value;
    this.user.userType = this.user.userType;
    this.user.emailConfirmed=true;
    console.log(this.user);
    this.idUserCreated = await this.userService.CreateAsync(this.user);
    console.log(this.idUserCreated);
    this.route.navigate(['Create-Role']);
    //window.location.reload();
  }

}
