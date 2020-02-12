import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { IUser, ICreateBy } from 'src/app/interfaces/user';
import { Environment } from 'src/app/stores/environment.store';
import { Bookstore } from 'src/app/stores/bookstore';
import { AdvertiseimageComponent } from '../../advertiseimage/advertiseimage.component';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  form: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  // password: AbstractControl;
  phone: AbstractControl;
  role: AbstractControl;
  facebook:AbstractControl;
  linkin:AbstractControl;
  googleplus:AbstractControl;
  description:AbstractControl;
  roles: any;
  profile;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private bk: Bookstore,
    private snackBar: MatSnackBar,
    public store: Environment,
    private dialog: MatDialog,
    ) { }

    buildForm(): void {
      this.form = this.fb.group({
        name: [
          this.data.name,
          Validators.compose([Validators.required])
        ],
        email: [this.data.email, [Validators.required]],
        phone: [this.data.phone],
        role: [null],
        facebook: [this.data.facebook],
        linkin: [this.data.linkin],
        googleplus: [this.data.googleplus],
        description: [this.data.description]
      });
      this.name = this.form.controls["name"];
      this.email = this.form.controls["email"];
      this.phone = this.form.controls["phone"];
      this.role = this.form.controls["role"];
      this.facebook = this.form.controls["facebook"];
      this.linkin = this.form.controls["linkin"];
      this.googleplus = this.form.controls["googleplus"];
      this.description = this.form.controls["description"];
    }

  async ngOnInit() {
    this.buildForm();
    this.roles = await this.bk.fetchRoleForUser();
    this.role.patchValue(this.roles.find(element => element.key == this.data.roles.key).key)
    this.profile = this.data.profile;
  }

  editProfile() {
    let dialogRef = this.dialog.open(AdvertiseimageComponent, {
      data: null,
      panelClass: "cs-overlay-panel",
      width: "60vw",
      height: "100vh",
      disableClose: true,
      role: "dialog",
      hasBackdrop: false
    });
    dialogRef.updatePosition({ top: "0", right: "0", bottom: "0" });
    dialogRef.afterClosed().subscribe(result => {
      // const range = this.quillEditorRef.getSelection(true);
      if (result) {
        for (const file of result) {
          this.profile = file.url;
          console.log(this.profile);
          // this.quillEditorRef.insertEmbed(range.index, 'image', file.url, 'user')
        }
      }

      // this.disableBtn = false;
    });
  }

  create(f: IUser, isNew) {
    if (this.form.valid) {
      const create_by:ICreateBy = {
        key: this.store.users.key,
        name: this.store.users.name,
        email: this.store.users.email
      };
      f.create_by = create_by;
      f.update_by = create_by;
      f.key = this.data.key;
      f.roles = this.roles.find(element => element.key == this.role.value)
      f.profile = this.profile ? this.profile : 'https://firebasestorage.googleapis.com/v0/b/puconline-c176c.appspot.com/o/avata%2Fphoto-1512904384.jpeg?alt=media&token=de1dd163-40e2-4117-8a6e-522b66f85e95';
      this.store.updateUser(f,(success, error)=> {
        if (success) {
              if (!isNew)
                this.dialogRef.close();
              this.snackBar.open('User updated.', 'done', { duration: 5000 });
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
