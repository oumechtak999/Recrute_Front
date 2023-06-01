import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ClipboardModule} from 'ngx-clipboard';

import {UserLayoutRoutes} from './user-layout.routing';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {NgxPaginationModule} from 'ngx-pagination';

import {HomePageComponent} from '../../views/User/HomePage.component';
import {ComponentsModule} from '../../components/components.module';
import {AdminLayoutModule} from '../admin-layout/admin-layout.module';
import {BnNgTreeModule} from 'bn-ng-tree-lib';
import {TreeViewModule} from '@syncfusion/ej2-angular-navigations';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {ElementsFilterByDescriptionPipe} from '../../ infrastructure/FilterPipes/ElementFilters/ElementsFilterByDescription.pipe';
import {ElementsFilterByDatePipe} from '../../ infrastructure/FilterPipes/ElementFilters/ElementsFilterByDate.pipe';
import {ElementsFilterByTitrePipe} from '../../ infrastructure/FilterPipes/ElementFilters/ElementsFilterByTitre.pipe';
import {ElementsComponent} from '../../views/User/Elements/Elements.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';

import {MatGridListModule} from '@angular/material/grid-list';
import {HistoryComponent} from '../../views/User/History/History.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';




// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComponentsModule,
    AdminLayoutModule,
    BnNgTreeModule,

    TreeViewModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule
    ,

    MatGridListModule,
    PdfViewerModule

  ],


  declarations: [
    HomePageComponent,
    ElementsComponent,
    HistoryComponent,
    ElementsFilterByDescriptionPipe,
    ElementsFilterByDatePipe,
    ElementsFilterByTitrePipe

  ]
})

export class UserLayoutModule {
}
