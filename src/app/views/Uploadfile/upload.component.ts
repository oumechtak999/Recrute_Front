import {HttpClient, HttpErrorResponse, HttpEventType, HttpRequest} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {environment} from '../../config/environment';


import {pdfDefaultOptions} from 'ngx-extended-pdf-viewer';
import {UploadService} from '../../services/Upload/Upload.service';
import {ElementService} from '../../services/Elements/Element.service';
import {Element} from '../../models/Element.model';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-upload',
  templateUrl: 'upload.component.html',
  styleUrls: ['./upload.component.html']
})
export class UploadComponent implements OnInit {
  log: any;
  pdfSrc = '';
  divisions: any[];
  typeUser: string;
  pere: any[];

  constructor(private http: HttpClient, private uploadService: UploadService, private elementService: ElementService) {
  }

  async ngOnInit() {
    this.typeUser = sessionStorage.getItem('userType');
    // this.activeModal = new NgbActiveModal();
    this.pere = await this.elementService.GetRoot();
    this.divisions = await this.elementService.GetElementsByPereId(this.pere[0].id);


  }

  private transformer = (node: Element, level: number) => {
    return {
      expandable: !!node.peres && node.peres.length > 0,
      name: node.nom,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.peres);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}


