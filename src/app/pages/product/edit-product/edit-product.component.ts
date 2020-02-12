import { ConvertService } from './../../../services/convert.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Environment } from 'src/app/stores/environment.store';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Product } from 'src/app/stores/product.store';
import { checkExistDoc, checkExistOnEdit } from 'src/app/services/fire-validators.service';
import { IPackage } from 'src/app/interfaces/subscriber';
import { StatusObj } from 'src/app/dummy/status';
import { ICreateBy } from 'src/app/interfaces/user';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  price: AbstractControl;
  period: AbstractControl;
  discount:AbstractControl;
  note:AbstractControl;

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store:Product,
    private afs:AngularFirestore,
    private ds:DataService
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [this.data.name, Validators.compose([Validators.required]),checkExistOnEdit(this.afs,"products","name", this.data.name)],
      price:[this.data.price,Validators.required],
      period:[this.data.period,Validators.required],
      discount:[this.data.discount],
      note:[this.data.note],
    })
    this.name = this.form.controls['name'];
    this.period=this.form.controls["period"];
    this.discount=this.form.controls["discount"];
    this.note=this.form.controls["note"];
    this.price=this.form.controls["price"];
  }


  ngOnInit() {
    this.buildForm();
  }

  create(f: any) {
    if (this.form.valid) {
      this.form.disable();
      const {name,price,period,discount,note}=f;
      const create_by:ICreateBy = {
        key: this.env.users.key,
        name: this.env.users.name,
        email: this.env.users.email
      };
      const item: IPackage = {
        key: this.data.key,
        name: name,
        status: StatusObj.ACTIVE,
        create_date: new Date(),
        create_by: create_by,
        page_key:ConvertService.pageKey(),
        update_date: new Date(),
        update_by: create_by,
        price:ConvertService.toNumber(price),
        period:ConvertService.toNumber(period),
        discount:ConvertService.toNumber(discount),
        note:note
      }
      this.store.update(this.ds.productRef(), item, (success, error) => {
        if (success) {
            this.dialogRef.close();
          this.snackBar.open('Package has been updated.', 'done', { duration: 2500 });
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
