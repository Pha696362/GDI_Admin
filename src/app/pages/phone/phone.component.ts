import { Component, OnInit } from '@angular/core';
import { Bookstore } from 'src/app/stores/bookstore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { EditPhonenumberComponent } from './edit-phonenumber/edit-phonenumber.component';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { IContact } from 'src/app/interfaces/bookstore';
import { tabs } from 'src/app/dummy/tabs';
import { AddNewPhoneComponent } from './add-new-phone/add-new-phone.component';
import { Environment } from 'src/app/stores/environment.store';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  tabs = tabs.contact;
  constructor(
    public env:Environment,
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData(this.ds.contactRef());
  }

  create() {
    let dialogRef = this.dialog.open(AddNewPhoneComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item:IContact) {
    let dialogRef = this.dialog.open(EditPhonenumberComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item: IContact) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete contact', memo: 'If tag is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.contactRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open('Contact has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}
