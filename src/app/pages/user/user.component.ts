import { AddUserComponent } from './add-user/add-user.component';
import { DeleteComponent } from './../../components/delete/delete.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Component, OnInit } from '@angular/core';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ForgotUserPasswordComponent } from './forgot-user-password/forgot-user-password.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(
    // public router: Router,
    public env: Environment,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.env.fetchData()
  }

  create() {
    let dialogRef = this.dialog.open(AddUserComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
      disableClose: true
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'yes') {
      this.snackBar.open('User created successfull.', 'done', { duration: 2000 });
    }
    });
  }

  update(item) {
    let dialogRef = this.dialog.open(EditUserComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  forgotUserPass(item) {
    let dialogRef = this.dialog.open(ForgotUserPasswordComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item) {
    console.log(item);
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete User', memo: 'If this district is using in other list you cannot delete district.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.env.deleteUser(item, (success, error) => {
          if (success) {
            this.snackBar.open('User has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
      // if (result === 'yes') {
        // this.geo.deleteProvince(item.key,(success,error)=>{
        //   if (success) {
        //     this.snackBar.open('Province has been deleted.', 'done', { duration: 2000 });
        //   }
        //   else {
        //     this.snackBar.open(error, 'Error')
        //   }
        // })
      // }
    });
  }
}
