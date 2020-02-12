import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { IUser } from 'src/app/interfaces/user';
import { Environment } from 'src/app/stores/environment.store';

@Component({
  selector: 'app-forgot-user-password',
  templateUrl: './forgot-user-password.component.html',
  styleUrls: ['./forgot-user-password.component.scss']
})
export class ForgotUserPasswordComponent implements OnInit {
  form: FormGroup;
  password: AbstractControl;
  confirm_password: AbstractControl;

  constructor(public dialogRef: MatDialogRef<ForgotUserPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,) { }

    buildForm(): void {
      this.form = this.fb.group({
        password: [null, [Validators.required,Validators.minLength(6),Validators.maxLength(25)]],
        confirm_password: [null,Validators.required]
      },{validator: this.passwordMatchValidator});
      this.password = this.form.controls["password"];
    }
    passwordMatchValidator(form: FormGroup) {
      // console.log(this.password.value)
      return form.value.password === form.value.confirm_password
         ? null : { mismatch: true};
    }
  ngOnInit() {
    this.buildForm();
  }
  create(f: IUser, isNew) {
    if (this.form.valid) {
      this.env.changePassword(f,(success, error)=> {
        if (success) {
              if (!isNew)
                this.dialogRef.close();
              this.snackBar.open('Password has been updated.', 'done', { duration: 5000 });
              this.form.reset();
              // this.inputEl.nativeElement.focus();
            }
            else {
              alert(error)
            }
      });
    }
  }

}
