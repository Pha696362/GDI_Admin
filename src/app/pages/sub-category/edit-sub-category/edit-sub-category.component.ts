import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AddNewSubCategoryComponent } from '../add-new-sub-category/add-new-sub-category.component';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { Environment } from 'src/app/stores/environment.store';
import { Bookstore } from 'src/app/stores/bookstore';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/services/data.service';
import { checkExistDoc } from 'src/app/services/fire-validators.service';
import { ISubCategory } from 'src/app/interfaces/bookstore';
import { StatusObj } from 'src/app/dummy/status';
import { ICreateBy } from 'src/app/interfaces/user';

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.scss']
})
export class EditSubCategoryComponent implements OnInit {

  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;

  constructor(
    public dialogRef: MatDialogRef<AddNewSubCategoryComponent>,
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
      name: [null, Validators.compose([Validators.required]),checkExistDoc(this.afs,"sub_category","name")],
      description:[null,]
    })
    this.name = this.form.controls['name'];
    // this.description = this.form.controls['description']
  }

  ngOnInit() {
    this.buildForm();
    this.name.patchValue(this.data.name)
  }
  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();

      // console.log(this.data.key)
      // console.log(this.data)
      const {name,description}=f;
      const create_by:ICreateBy = {
        key: this.env.users.key,
        name: this.env.users.name,
        email: this.env.users.email
      };
      const item: ISubCategory = {
        key: this.data.key,
        name: name,
        category: this.data.category,
        status: this.data.status,
        create_date: this.data.create_date.toDate(),
        create_by: create_by,
        page_key:this.data.page_key,
        update_date: new Date(),
        update_by: create_by,

      }
      // console.log(item)
      this.store.UpdateSubcategory(item,this.data.key,(success, error) => {
        if (success) {
          this.dialogRef.close();
          this.snackBar.open("Sub_category have been saved successful.", "done", {
            duration: 2000
          });
        } else {
          this.form.enable();
          this.snackBar.open(error, "Error");
        }
      }
    );
    }
  }

}
