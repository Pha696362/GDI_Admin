import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import {  IContact } from 'src/app/interfaces/bookstore';
import { StatusObj } from 'src/app/dummy/status';
import { ConvertService } from 'src/app/services/convert.service';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { EditPhonenumberComponent } from '../edit-phonenumber/edit-phonenumber.component';
import { Environment } from 'src/app/stores/environment.store';
import { Bookstore } from 'src/app/stores/bookstore';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-new-phone',
  templateUrl: './add-new-phone.component.html',
  styleUrls: ['./add-new-phone.component.scss']
})
export class AddNewPhoneComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  phonenumber:AbstractControl;
  email:AbstractControl;
  address:AbstractControl;
  
  constructor(
    public dialogRef: MatDialogRef<AddNewPhoneComponent>,
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
      name: [null,],
      phonenumber:[null,],
      email:[null],
      address:[null,],
      
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
      const item: IContact = {
        key: this.ds.createId(),
        name: name,
        phonenumber:phonenumber,
        email:email,
        address:address,
        status: StatusObj.ACTIVE,
        create_date: new Date(),
        create_by: this.env.users,
        page_key:ConvertService.pageKey(),
        update_date: new Date(),
        update_by: this.env.users,
      }
      this.store.addNew(this.ds.contactRef(),item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Contact has been created.', 'done', { duration: 2500 });
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