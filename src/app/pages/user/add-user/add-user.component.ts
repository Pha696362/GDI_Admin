import { PhoneNumber } from "../../../services/phoneNumber.service";
import { MappingService } from "../../../services/mapping.service";
import { Environment } from "../../../stores/environment.store";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthStore } from '../../../stores/auth.store';
import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef
} from "@angular/core";
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from "@angular/material";
import { FireValidatorsService } from "../../../services/fire-validators.service";
import { IUser, ICreateBy } from "src/app/interfaces/user";
import { WindowService } from "src/app/services/window.service";
import { Bookstore } from 'src/app/stores/bookstore';
import { AdvertiseimageComponent } from '../../advertiseimage/advertiseimage.component';

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"]
})
export class AddUserComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  confirm_password: AbstractControl;
  phone: AbstractControl;
  role: AbstractControl;
  facebook: AbstractControl;
  linkin: AbstractControl;
  googleplus:AbstractControl;
  description: AbstractControl;
  roles:any;
  profile;

  filteredStatesProvince: any;
  filteredStatesDistrict: any;
  filteredStatesCommune: any;

  windowRef: any;
  phoneNumber = new PhoneNumber();
  verificationCode: string;
  user: any;
  url = 'https://firebasestorage.googleapis.com/v0/b/ecrime-6aadb.appspot.com/o/userpic.svg?alt=media&token=57515eb6-b254-4689-91a5-16dde7947f79';
  byPhone: boolean = false;
  myPhone: any;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public store: Environment,
    public Auth: AuthStore,
    public bk: Bookstore,
    private dialog: MatDialog,
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [
        null,
        Validators.compose([Validators.required]),
        FireValidatorsService.checkExist(this.afs, "geo_provinces", "code")
      ],
      email: [null, [Validators.required,Validators.email,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: [null, [Validators.required,Validators.minLength(6),Validators.maxLength(25)]],
      confirm_password: [null,Validators.required],
      phone: [null],
      role: [null],
      facebook: [null],
      linkin: [null],
      googleplus: [null],
      description: [null]

    }, {validator: this.passwordMatchValidator});
    this.name = this.form.controls["name"];
    this.email = this.form.controls["email"];
    this.password = this.form.controls["password"];
    this.phone = this.form.controls["phone"];
    this.role = this.form.controls["role"];
    this.facebook = this.form.controls["facebook"];
    this.linkin = this.form.controls["linkin"];
    this.googleplus = this.form.controls["googleplus"];
    this.description = this.form.controls["description"]
  }
  passwordMatchValidator(form: FormGroup) {
    // console.log(this.password.value)
    return form.value.password === form.value.confirm_password
       ? null : { mismatch: true};
  }

  displayItem(item: any): string {
    return item ? item.name : item;
  }

  async ngOnInit() {
    this.buildForm();
    this.roles = await this.bk.fetchRoleForUser();
    this.role.patchValue(this.roles[0].key)
    this.profile = 'https://firebasestorage.googleapis.com/v0/b/puconline-c176c.appspot.com/o/avata%2Fphoto-1512904384.jpeg?alt=media&token=de1dd163-40e2-4117-8a6e-522b66f85e95'
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
    const create_by:ICreateBy = {
      key: this.store.users.key,
      name: this.store.users.name,
      email: this.store.users.email
    };
    f.roles = this.roles.filter(ad => ad.key === this.role.value)[0];
    f.create_by = create_by;
    f.update_by = create_by;
    f.profile = this.profile ? this.profile : 'https://firebasestorage.googleapis.com/v0/b/puconline-c176c.appspot.com/o/avata%2Fphoto-1512904384.jpeg?alt=media&token=de1dd163-40e2-4117-8a6e-522b66f85e95';
    if (this.form.valid) {
      f.create_date = new Date();
      this.Auth.signUp(f,(success, error)=> {
        if (success) {
              if (!isNew)
                this.dialogRef.close('yes');
              this.snackBar.open('created.', 'done', { duration: 5000 });
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
