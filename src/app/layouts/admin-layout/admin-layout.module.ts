import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ClipboardModule} from 'ngx-clipboard';

import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CreateUsersComponent} from '../../views/Admin/CreateUsers/CreateUsers.component';

import {CreateServiceComponent} from '../../views/Admin/CreateService/CreateService.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ServicesFilterPipe} from '../../ infrastructure/FilterPipes/ServicesFilter.pipe';
import {CreateRoleComponent} from '../../views/Admin/CreateRole/CreateRole.component';
import {UsersFilterPipe} from '../../ infrastructure/FilterPipes/UsersFilter.pipe';
import {ElementsFilterPipe} from '../../ infrastructure/FilterPipes/ElementsFilter.pipe';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {CustomMaterialModule} from '../../ infrastructure/DialogFeature/CustomMaterial.module';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    CustomMaterialModule,

    MatToolbarModule,
    MatButtonModule,
    MatListModule,
  ],
    exports: [
        UsersFilterPipe,
        ElementsFilterPipe
    ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    MapsComponent,
    CreateUsersComponent,
    CreateServiceComponent,
    CreateRoleComponent,
    ServicesFilterPipe,
    UsersFilterPipe,
    ElementsFilterPipe
  ]
})

export class AdminLayoutModule {
}
