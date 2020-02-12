import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { StatusObj } from 'src/app/dummy/status';
import { ConvertService } from 'src/app/services/convert.service';
import { IAbout, IContact } from 'src/app/interfaces/bookstore';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Bookstore } from 'src/app/stores/bookstore';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/services/data.service';
import { ICreateBy } from 'src/app/interfaces/user';

@Component({
  selector: 'app-edit-phonenumber',
  templateUrl: './edit-phonenumber.component.html',
  styleUrls: ['./edit-phonenumber.component.scss']
})
export class EditPhonenumberComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  phonenumber:AbstractControl;
  email:AbstractControl;
  address:AbstractControl;

  constructor(
    public dialogRef: MatDialogRef<EditPhonenumberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store:Bookstore,
    private afs:AngularFirestore,
    private ds:DataService
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [this.data.name],
      phonenumber:[this.data.phonenumber],
      email:[this.data.email],
      address:[this.data.address],

    })
    this.name = this.form.controls['name'];
    this.phonenumber= this.form.controls['phonenumber'];
    this.email= this.form.controls['email'];
    this.address= this.form.controls['address'];


  }


  ngOnInit() {
    this.buildForm();
  }

  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const {name,phonenumber,email,address}=f;
      const create_by:ICreateBy = {
        key: this.env.users.key,
        name: this.env.users.name,
        email: this.env.users.email
      };
      const item: IContact = {
        key: this.data.key,
        name: name,
        phonenumber:phonenumber,
        email:email,
        address:address,
        status: StatusObj.ACTIVE,
        create_date: new Date(),
        create_by: create_by,
        page_key:ConvertService.pageKey(),
        update_date: new Date(),
        update_by: create_by,
      }
      this.store.addNew(this.ds.contactRef(),item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Contact has been update.', 'done', { duration: 2500 });
          this.form.enable();
          this.form.reset();
        }
        else {
          alert(error)
        }
      })
    }
  }
}
