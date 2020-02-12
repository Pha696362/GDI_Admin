
import { ConvertService } from './../../../services/convert.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { checkExistDoc } from './../../../services/fire-validators.service';
import { Bookstore } from './../../../stores/bookstore';
import { Environment } from './../../../stores/environment.store';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef,Inject } from '@angular/core';
import { ICategory, ISubCategory } from 'src/app/interfaces/bookstore';
import { StatusObj } from 'src/app/dummy/status';
import { ICreateBy } from 'src/app/interfaces/user';

@Component({
  selector: 'app-add-new-sub-category',
  templateUrl: './add-new-sub-category.component.html',
  styleUrls: ['./add-new-sub-category.component.scss']
})
export class AddNewSubCategoryComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  // description:AbstractControl;
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
  }

  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();

      const {name,description}=f;
      const create_by:ICreateBy = {
        key: this.env.users.key,
        name: this.env.users.name,
        email: this.env.users.email
      };
      const item: ISubCategory = {
        key: this.ds.createId(),
        name: name,
        category: this.data,
        status: StatusObj.ACTIVE,
        create_date: new Date(),
        create_by: create_by,
        page_key:ConvertService.pageKey(),
        update_date: new Date(),
        update_by: create_by,

      }
      this.store.saveSubcategory(item,this.data.key,(success, error) => {
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


      // this.store.addNew(this.ds.categoryRef().doc(this.data.key).collection('sub_category'),item, (success, error) => {
      //   if (success) {

      //   }
      //   else {
      //     alert(error)
      //   }
      // })
      // this.store.addNew(this.ds.subcategoryRef(),item, (success, error) => {
      //   if (success) {
      //     if (!isNew)
      //       this.dialogRef.close();
      //     this.snackBar.open('Sub-Category has been created.', 'done', { duration: 2500 });
      //     this.form.enable();
      //     this.form.reset();
      //     this.inputEl.nativeElement.focus();
      //   }
      //   else {
      //     alert(error)
      //   }
      // })
    }
  }

}
