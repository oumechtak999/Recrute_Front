import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthenticationService} from '../../services/Authentications/Authentication.service';
import {Router} from '@angular/router';
import { Admin } from 'src/app/models/Admin.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {


  loginForm: FormGroup;

  admin: Admin = null;
  idtockenCreated: any;
  responsedata: any;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private route: Router) {
  }

  ngOnInit() {
    this.getLoginForm();
  }

  ngOnDestroy() {
  }

  getLoginForm() {


    this.loginForm = this.fb.group({

      username: [, [Validators.required]],
      password: [, [Validators.required]],


    });
  }

  get registerFormLoginControl() {
    return this.loginForm.controls;
  }


  async login(form: FormGroup) {
    if (this.loginForm.valid) {
      this.admin = new Admin();
      this.admin = form.value;

      this.idtockenCreated = await this.authenticationService.userAuthentication(this.admin);
      console.log(this.idtockenCreated);
      if (this.idtockenCreated.id == null) {
        alert('Username ou mot de passe est incorrecte !!');
      }
      if (this.idtockenCreated.id != null) {
        this.responsedata = this.idtockenCreated;
        sessionStorage.setItem('token', this.responsedata.token);
       sessionStorage.setItem('userid', this.responsedata.id);
          this.route.navigate(['Admin']);

       


      }


    } else {
      alert('Username ou mot de passe est invalide !!');
    }
  }
}
