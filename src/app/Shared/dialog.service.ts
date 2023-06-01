import {MatDialog} from '@angular/material/dialog';

import { Injectable } from '@angular/core';

import {ConfirmDialogComponent} from '../ infrastructure/DialogFeature/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '800px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: '10px' },
      data : {
        message : msg
      }
    });
  }
}
