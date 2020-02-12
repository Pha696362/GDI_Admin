import { Component, OnInit } from '@angular/core';
import { Bookstore } from 'src/app/stores/bookstore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { AddEmbulanceComponent } from './add-embulance/add-embulance.component';
import { tabs } from 'src/app/dummy/tabs';
import {  IAmbulance } from 'src/app/interfaces/bookstore';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { EditEmbulanceComponent } from './edit-embulance/edit-embulance.component';

@Component({
  selector: 'app-embulance',
  templateUrl: './embulance.component.html',
  styleUrls: ['./embulance.component.scss']
})
export class EmbulanceComponent implements OnInit {
  tabs = tabs.embulance;
  constructor(
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData(this.ds.embulanceRef());
  }

  create() {
    let dialogRef = this.dialog.open(AddEmbulanceComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item: IAmbulance) {
    let dialogRef = this.dialog.open(EditEmbulanceComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item: IAmbulance) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete embulance', memo: 'If embulance is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.embulanceRef(), item, (success, error) => {
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
