import { ForgotPasswordComponent } from './../../components/forgot-password/forgot-password.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AuthStore } from 'src/app/stores/auth.store';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  hide = true;
  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  error: any;
  process = false;
  constructor(
    private fb: FormBuilder,
    public auth: AuthStore,
    private router: Router,
    public dialog: MatDialog,
    private ds: DataService,
  ) {
    // this.auth.isLoggedIn().then(doc => {
    //   if (doc) {
    //     this.router.navigate(['/']);
    //   }
    // });
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  _emailLogIn(f: any): void {
    this.error = null;
    this.process = true;
    if (this.form.valid) {
      this.process = true;
      this.auth.signIn(f);
      this.process = false;
    } else {
      this.process = false;
      this.form.enable();
      this.error = 'Please enter your email and password.';
    }
  }

  resetPassword() {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      data: null,
      panelClass: "register-test-overlay-panel",
      width: "35vw",
      height: "100vh",
      disableClose: true,
      role: "dialog"
    });
    dialogRef.updatePosition({ top: "0", right: "0", bottom: "0" });
    dialogRef.afterClosed().subscribe(result => { });
  }

}
