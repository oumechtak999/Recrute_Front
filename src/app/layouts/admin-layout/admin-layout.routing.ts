import { Routes } from '@angular/router';
import {CreateUsersComponent} from '../../views/Admin/CreateUsers/CreateUsers.component';
import {CreateServiceComponent} from '../../views/Admin/CreateService/CreateService.component';
import {CreateRoleComponent} from '../../views/Admin/CreateRole/CreateRole.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'Create-Users',      component: CreateUsersComponent },
  { path: 'Create-Service',      component: CreateServiceComponent },
  { path: 'Create-Role',      component: CreateRoleComponent }
];
