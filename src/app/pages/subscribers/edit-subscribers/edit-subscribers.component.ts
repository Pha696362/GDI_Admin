import { ConvertService, toDateExpiredDate } from './../../../services/convert.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Environment } from 'src/app/stores/environment.store';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { checkExistDoc } from 'src/app/services/fire-validators.service';
import { IPackage, ISubscriber } from 'src/app/interfaces/subscriber';
import { StatusObj } from 'src/app/dummy/status';
import { Subscriber } from 'src/app/stores/subscriber.store';

@Component({
  selector: 'app-edit-subscribers',
  templateUrl: './edit-subscribers.component.html',
  styleUrls: ['./edit-subscribers.component.scss']
})
export class EditSubscribersComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  phone: AbstractControl;
  email: AbstractControl;
  firstName: AbstractControl;
  lastName: AbstractControl;
  product: AbstractControl;

  products: any;
  constructor(
    public dialogRef: MatDialogRef<EditSubscribersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store: Subscriber,
    private afs: AngularFirestore,
    private ds: DataService
  ) { }

  async buildForm() {
    this.form = this.fb.group({
      // phone: [null, Validators.compose([]), checkExistDoc(this.afs, "subscribers", "phoneNumber")],
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName, Validators.required],
      // product: [null,],
      email: [this.data.email],
    })
    // this.phone = this.form.controls['phone'];
    this.firstName = this.form.controls["period"];
    this.lastName = this.form.controls["lastName"];
    // this.product = this.form.controls["product"];
    this.email = this.form.controls["email"];
    // this.products = await this.store.fetchPackage();
    // this.product.patchValue(this.products[0])
  }


  ngOnInit() {
    this.buildForm();
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }


  create(f: any) {
    if (this.form.valid) {
      this.form.disable();
      const { firstName, lastName, email, } = f;
      const item: ISubscriber = {
        key: this.data.key,
        update_date: new Date(),
        update_by: this.env.users,
        firstName: firstName.toUpperCase(),
        lastName: lastName.toUpperCase(),
        fullName: `${lastName.toUpperCase()} ${firstName.toUpperCase()}`,
        email: email,
      }
      this.store.update(this.ds.subscriberRef(), item, (success, error) => {
        if (success) {
          this.dialogRef.close();
          this.snackBar.open('Membership has been updated.', 'done', { duration: 2500 });
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
