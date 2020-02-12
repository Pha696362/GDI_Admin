import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { IFiretruck } from 'src/app/interfaces/bookstore';
import { StatusObj } from 'src/app/dummy/status';
import { ConvertService } from 'src/app/services/convert.service';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { checkExistDoc } from 'src/app/services/fire-validators.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { Bookstore } from 'src/app/stores/bookstore';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-fire-truck',
  templateUrl: './add-fire-truck.component.html',
  styleUrls: ['./add-fire-truck.component.scss']
})
export class AddFireTruckComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  phone:AbstractControl;

  constructor(
    public dialogRef: MatDialogRef<AddFireTruckComponent>,
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
      phone:[null,],

    })
    this.name = this.form.controls['name'];
    this.phone = this.form.controls['phone'];

  }


  ngOnInit() {
    this.buildForm();
  }

  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const {name,phone}=f;
      const item: IFiretruck = {
        key: this.ds.createId(),
        name: name,
        phone: phone,

        status: StatusObj.ACTIVE,
        create_date: new Date(),
        create_by: this.env.users,
        page_key:ConvertService.pageKey(),
        update_date: new Date(),
        update_by: this.env.users,
      }
      this.store.addNew(this.ds.firetruckRef(),item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Embulance has been created.', 'done', { duration: 2500 });
          this.form.enable();
          this.form.reset();
          this.inputEl.nativeElement.focus();
        }
        else {
          alert(error)
        }
      })
    }
  }
}