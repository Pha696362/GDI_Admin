import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog, MatListOption, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { tabs } from 'src/app/dummy/tabs';
import { AdvertisementStore } from 'src/app/stores/advertisement.store';
import { Gallery } from 'src/app/interfaces/subscriber'
import { UploadAdvertiseImagesComponent } from '../../advertiseimage/upload-advertise-images/upload-advertise-images.component';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { Bookstore } from 'src/app/stores/bookstore';
import { DataService } from 'src/app/services/data.service';
import { Environment } from 'src/app/stores/environment.store';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  // tabs = tabs.images;

  constructor(
    public env: Environment,
    public adStore: AdvertisementStore,
    private dialog: MatDialog,
    private store: Bookstore,
    private ds: DataService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.adStore.fetchAdvertiseData();
  }

  create() {
    let dialogRef = this.dialog.open(UploadAdvertiseImagesComponent, {
      data: null,
      panelClass: 'cs-overlay-panel',
      width: '',
      height: '',
      // disableClose: true,
      role: 'dialog',
      // hasBackdrop:false,
    });
  }

  delete(item: any){
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete Image', memo: 'If image is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.advertisementRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open('Advertisement has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}
