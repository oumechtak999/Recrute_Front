import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';

import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {ToastrModule} from 'ngx-toastr';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule, MatTreeNestedDataSource} from '@angular/material/tree';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {PortalModule} from '@angular/cdk/portal';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';

import {CustomMaterialModule} from './ infrastructure/DialogFeature/CustomMaterial.module';
import {ConfirmDialogComponent} from './ infrastructure/DialogFeature/confirm-dialog.component';

import {UserLayoutComponent} from './layouts/user-layout/user-layout.component';


import {UserLayoutModule} from './layouts/user-layout/user-layout.module';
import {AuthenticationService} from './services/Authentications/Authentication.service';

import {Papa} from 'ngx-papaparse';

import {NgxPaginationModule} from 'ngx-pagination';

import {TokenInterceptorService} from './services/Tocken/token-interceptor.service';

import {ElementService} from './services/Elements/Element.service';
import {UserRoleService} from './services/UserRole.service';
import {TreeViewModule} from '@syncfusion/ej2-angular-navigations';
import {FileUploadService} from './services/FileUpload/FileUpload.service';

import {UploadService} from './services/Upload/Upload.service';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {EmailService} from './services/Email/Email.service';

import { CandidatService } from './services/Candidat/Candidat.service';
import { AdminService } from './services/Admin/Admin.service';
import { CvService } from './services/Cv/Cv.service';
import { OffreService } from './services/Offre/Offre.service';

import { OffreCandidatService } from './services/OffreCandidat/OffreCandidat.service';
import { AdminPageComponent } from './views/Admin/AdminPage/AdminPage.component';
import { CandidatsFilterByTelephonePipe } from './ infrastructure/FilterPipes/CandidatFilters/CandidatsFilterByTelephone.pipe';
import { CandidatsFilterByEmailPipe } from './ infrastructure/FilterPipes/CandidatFilters/CandidatsFilterByEmail.pipe';
import { CandidatsFilterByPrenomPipe } from './ infrastructure/FilterPipes/CandidatFilters/CandidatsFilterByPrenom.pipe';
import { CandidatsFilterByNomPipe } from './ infrastructure/FilterPipes/CandidatFilters/CandidatsFilterByNom.pipe';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    NgxDatatableModule,
    RouterModule,
    AppRoutingModule,
    CustomMaterialModule,
    ToastrModule.forRoot(),
    MatToolbarModule,
    MatButtonModule,
    MatListModule
    , PdfViewerModule,
    NgxExtendedPdfViewerModule,
    HttpClientJsonpModule,
    UserLayoutModule,
     NgxPaginationModule, MatTreeModule, MatProgressBarModule, MatCardModule, MatGridListModule


  ],

  declarations: [
    AppComponent,
    
    AdminLayoutComponent,
    UserLayoutComponent,
    AuthLayoutComponent,
    
    
    ConfirmDialogComponent
  
  ],

  entryComponents: [ConfirmDialogComponent],
  providers: [
    AuthenticationService,  ElementService, UserRoleService, FileUploadService,
    UploadService, EmailService,
    OffreService,OffreCandidatService,CvService,AdminService,CandidatService
    , {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],

  bootstrap: [AppComponent]
})
export class AppModule {
}
