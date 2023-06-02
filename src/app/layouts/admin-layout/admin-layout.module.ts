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
import {NgxPaginationModule} from 'ngx-pagination';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {CustomMaterialModule} from '../../ infrastructure/DialogFeature/CustomMaterial.module';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { AdminPageComponent } from 'src/app/views/Admin/AdminPage/AdminPage.component';
import { ComponentsModule } from "../../components/components.module";
import { CandidatsFilterByNomPipe } from 'src/app/ infrastructure/FilterPipes/CandidatFilters/CandidatsFilterByNom.pipe';
import { CandidatsFilterByPrenomPipe } from 'src/app/ infrastructure/FilterPipes/CandidatFilters/CandidatsFilterByPrenom.pipe';
import { CandidatsFilterByEmailPipe } from 'src/app/ infrastructure/FilterPipes/CandidatFilters/CandidatsFilterByEmail.pipe';
import { CandidatsFilterByTelephonePipe } from 'src/app/ infrastructure/FilterPipes/CandidatFilters/CandidatsFilterByTelephone.pipe';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
    exports: [
     
    ],
    declarations: [
        DashboardComponent,
        UserProfileComponent,
        MapsComponent,
        AdminPageComponent,
        CandidatsFilterByNomPipe,
        CandidatsFilterByPrenomPipe,
        CandidatsFilterByEmailPipe,
        CandidatsFilterByTelephonePipe,
        
    ],
    imports: [
      ComponentsModule,
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
        MatListModule
    ]
})

export class AdminLayoutModule {
}
