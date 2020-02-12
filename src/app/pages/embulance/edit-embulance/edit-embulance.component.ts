import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Bookstore } from 'src/app/stores/bookstore';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/services/data.service';
import { IAmbulance } from 'src/app/interfaces/bookstore';
import { StatusObj } from 'src/app/dummy/status';
import { ConvertService } from 'src/app/services/convert.service';

@Component({
  selector: 'app-edit-embulance',
  templateUrl: './edit-embulance.component.html',
  styleUrls: ['./edit-embulance.component.scss']
})
export class EditEmbulanceComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  phone:AbstractControl;

  constructor(
    public dialogRef: MatDialogRef<EditEmbulanceComponent>,
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
      phone:[this.data.phone],

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
      const item: IAmbulance = {
        key: this.data.key,
        name: name,
        phone: phone,

        status: StatusObj.ACTIVE,
        create_date: new Date(),
        create_by: this.env.users,
        page_key:ConvertService.pageKey(),
        update_date: new Date(),
        update_by: this.env.users,
      }
      this.store.update(this.ds.embulanceRef(),item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Embulance has been update.', 'done', { duration: 2500 });
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