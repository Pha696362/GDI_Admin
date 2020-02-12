import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { IEntertainment } from 'src/app/interfaces/bookstore';
import { StatusObj } from 'src/app/dummy/status';
import { ConvertService } from 'src/app/services/convert.service';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Bookstore } from 'src/app/stores/bookstore';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-entertainment',
  templateUrl: './edit-entertainment.component.html',
  styleUrls: ['./edit-entertainment.component.scss']
})
export class EditEntertainmentComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  videos: AbstractControl;
  order: AbstractControl;
  constructor(
    public dialogRef: MatDialogRef<EditEntertainmentComponent>,
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
      videos:[this.data.videos],
      order:[this.data.order],

    })
    this.name = this.form.controls['name'];
    this.videos=this.form.controls["videos"];
    this.order=this.form.controls["order"];

  }


  ngOnInit() {
    this.buildForm();
  }

  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const {name,videos,order}=f;
      const item: IEntertainment = {
        key: this.data.key,
        name: name,
        status: StatusObj.ACTIVE,
        create_date: new Date(),
        create_by: this.env.users,
        page_key:ConvertService.pageKey(),
        update_date: new Date(),
        update_by: this.env.users,
        videos:videos,
        order:order,
        
      }
      this.store.update(this.ds.entertainmentRef(),item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Entertianment has been created.', 'done', { duration: 2500 });
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