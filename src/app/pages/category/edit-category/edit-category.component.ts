import { ConvertService } from './../../../services/convert.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { checkExistDoc, checkExistOnEdit } from './../../../services/fire-validators.service';
import { Bookstore } from './../../../stores/bookstore';
import { Environment } from './../../../stores/environment.store';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ICategory } from 'src/app/interfaces/bookstore';
import { ICreateBy } from 'src/app/interfaces/user';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  // description:AbstractControl;
  constructor(
    public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store: Bookstore,
    private afs: AngularFirestore,
    private ds: DataService
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [this.data.name],
      description:[this.data.description]
    })
    this.name = this.form.controls['name'];
    // this.description = this.form.controls['description'];
  }


  ngOnInit() {
    this.buildForm();
  }

  create(f: any) {
    if (this.form.valid) {
      this.form.disable();
      const { name } = f;
      const create_by:ICreateBy = {
        key: this.env.users.key,
        name: this.env.users.name,
        email: this.env.users.email
      };
      const item: ICategory = {
        key: this.data.key,
        name: name,
        update_date: new Date(),
        create_by: create_by,
        update_by: create_by,
      }
      this.store.update(this.ds.categoryRef(), item, (success, error) => {
        if (success) {
          this.dialogRef.close();
          this.snackBar.open('Category has been updated.', 'done', { duration: 2500 });
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
