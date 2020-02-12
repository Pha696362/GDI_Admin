import { Environment } from './../../stores/environment.store';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from 'src/app/stores/auth.store';
import { MatDialog } from '@angular/material';
import { ForgotUserPasswordComponent } from 'src/app/pages/user/forgot-user-password/forgot-user-password.component';
import { EditUserComponent } from 'src/app/pages/user/edit-user/edit-user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public auth: AuthStore,
    private router:Router,
    public env:Environment,
    public dialog: MatDialog
    // private campus:Campus,
    // private store:Institute
  ) { }

  logOut() {
    this.auth.signOut();
  }

  changePassword() {
    let dialogRef = this.dialog.open(ForgotUserPasswordComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
}
UpdateProfile() {
  let dialogRef = this.dialog.open(EditUserComponent, {
    data: this.env.users,
    width: '35vw',
    height: '100vh',
    role: 'dialog',
  });
  dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
}
  ngOnInit() {
    // this.campus.fetchCampus()
  }

}
