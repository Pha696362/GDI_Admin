import { DeleteComponent } from './../../components/delete/delete.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-users',
  templateUrl: './account-users.component.html',
  styleUrls: ['./account-users.component.scss']
})
export class AccountUsersComponent implements OnInit {
  constructor(
    public router: Router,
    public store: Environment,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData();
  }

  create() {
    // let dialogRef = this.dialog.open(AddAccountUserComponent, {
    //   data: null,
    //   width: '35vw',
    //   height: '100vh',
    //   role: 'dialog',
    //   disableClose: true
    // });
    // dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  update(item) {
    // let dialogRef = this.dialog.open(EditAccountUserComponent, {
    //   data: item,
    //   width: '35vw',
    //   height: '100vh',
    //   role: 'dialog',
    // });
    // dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'លុបគណនីអ្នកប្រើ', memo: 'គណនីនេះនឹងលុបពីប្រព័ន្ធ', name: item.full_name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.deleteUser(item, (success, error) => {
          if (success) {
            this.snackBar.open('គណនីត្រូវបានលុប', 'ដោយជោគជ័យ', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}
