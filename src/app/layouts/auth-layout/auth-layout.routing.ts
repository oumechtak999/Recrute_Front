import { Routes } from '@angular/router';


import {RegisterComponent} from '../../pages/register/register.component';
import {LoginComponent} from '../../views/login/login.component';



export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent }
];
