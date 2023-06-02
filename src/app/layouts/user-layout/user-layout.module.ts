import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ClipboardModule} from 'ngx-clipboard';

import {UserLayoutRoutes} from './user-layout.routing';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {NgxPaginationModule} from 'ngx-pagination';
import {AdminLayoutModule} from '../admin-layout/admin-layout.module';
import {BnNgTreeModule} from 'bn-ng-tree-lib';
import {TreeViewModule} from '@syncfusion/ej2-angular-navigations';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';

import {MatGridListModule} from '@angular/material/grid-list';

import {PdfViewerModule} from 'ng2-pdf-viewer';
import { HomeComponent } from 'src/app/views/User/Home/Home.component';
import { ComponentsModule } from 'src/app/components/components.module';





// import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(UserLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
        ClipboardModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        BnNgTreeModule,
        TreeViewModule,
        MatTreeModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatCardModule,
        MatToolbarModule,
        MatGridListModule,
        PdfViewerModule,
        ComponentsModule,
    ]
})

export class UserLayoutModule {
}
