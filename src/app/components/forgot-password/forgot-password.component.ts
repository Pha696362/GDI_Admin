import { AbstractControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthStore } from 'src/app/stores/auth.store';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  email: AbstractControl;
  loading = false;
  process = false;
  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private auth: AuthStore,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.required],
    });
    this.email = this.form.controls['email'];
  }

  create(f: any) {
    if (this.form.valid) {
      this.form.disable();
      this.process = true;
      // const {email}=f;
      // this.auth.resetPassword(email).then(()=>{
      //   this.snackBar.open('Please check your email.', 'done', { duration: 2000 });
      //   this.process = false;
      //   this.form.enable();
      // }).catch(error=>{
      //   this.snackBar.open(error, 'Error');
      // });


      this.process = false;
    }
  }

}
