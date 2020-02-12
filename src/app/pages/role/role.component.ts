import { Component, OnInit } from '@angular/core';
import { Environment } from 'src/app/stores/environment.store';
import { MatDialog } from '@angular/material';
import { AddRoleComponent } from './add-role/add-role.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { EditRoleComponent } from './edit-role/edit-role.component';
import { IRole } from 'src/app/interfaces/bookstore';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  constructor(public env: Environment,public dialog: MatDialog,private snackBar: MatSnackBar,public ds: DataService) { }

  ngOnInit() {
    this.env.fetchRole();
  }
  create() {
    let dialogRef = this.dialog.open(AddRoleComponent, {
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
    console.log(item)
    let dialogRef = this.dialog.open(EditRoleComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }
  delete(item: IRole) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete Advertisement', memo: 'If advertisement is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.env.deleteRole(this.ds.userRole(), item, (success, error) => {
          if (success) {
            this.snackBar.open('Role has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}
