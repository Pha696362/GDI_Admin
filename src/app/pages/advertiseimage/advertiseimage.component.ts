import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog, MatListOption } from '@angular/material';
import { FormBuilder } from '@angular/forms';

import { UploadAdvertiseImagesComponent } from './upload-advertise-images/upload-advertise-images.component';
import { AdvertisementStore } from 'src/app/stores/advertisement.store';

@Component({
  selector: 'app-advertiseimage',
  templateUrl: './advertiseimage.component.html',
  styleUrls: ['./advertiseimage.component.scss']
})
export class AdvertiseimageComponent implements OnInit {
  disableBtn
  constructor(
    public dialogRef: MatDialogRef<AdvertiseimageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    public fm: AdvertisementStore,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fm.fetchAdvertiseData();
  }
  current_selected: any;
  onSelection(options:MatListOption[]){
   this.current_selected = options.map(o => {
     return o.value
   })
  }

  showUploadFile() {
    this.disableBtn = true
    let dialogRef = this.dialog.open(UploadAdvertiseImagesComponent, {
      data: null,
      panelClass: 'cs-overlay-panel',
      width: '',
      height: '',
      // disableClose: true,
      role: 'dialog',
      // hasBackdrop:false,
    });
    // dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
    dialogRef.afterClosed().subscribe(result => {
      this.disableBtn = false;
    });
  }
}
