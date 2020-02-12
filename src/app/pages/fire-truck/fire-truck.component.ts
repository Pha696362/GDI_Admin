import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Bookstore } from 'src/app/stores/bookstore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { EditFireTruckComponent } from './edit-fire-truck/edit-fire-truck.component';
import { AddFireTruckComponent } from './add-fire-truck/add-fire-truck.component';
import {  IFiretruck } from 'src/app/interfaces/bookstore';
import { DeleteComponent } from 'src/app/components/delete/delete.component';

@Component({
  selector: 'app-fire-truck',
  templateUrl: './fire-truck.component.html',
  styleUrls: ['./fire-truck.component.scss']
})
export class FireTruckComponent implements OnInit {
  tabs = tabs.firetruck;
  constructor(
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData(this.ds.firetruckRef());
  }

  create() {
    let dialogRef = this.dialog.open(AddFireTruckComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item: IFiretruck) {
    let dialogRef = this.dialog.open(EditFireTruckComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item: IFiretruck) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete embulance', memo: 'If embulance is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.firetruckRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open('Embulance has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}
