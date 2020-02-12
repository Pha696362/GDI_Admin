import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Bookstore } from 'src/app/stores/bookstore';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/services/data.service';
import { IGenre, ITvnews } from 'src/app/interfaces/bookstore';
import { StatusObj } from 'src/app/dummy/status';
import { ConvertService } from 'src/app/services/convert.service';

@Component({
  selector: 'app-add-tv-news',
  templateUrl: './add-tv-news.component.html',
  styleUrls: ['./add-tv-news.component.scss']
})
export class AddTvNewsComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  videos: AbstractControl;
  order: AbstractControl;
  playlist: AbstractControl;
  constructor(
    public dialogRef: MatDialogRef<AddTvNewsComponent>,
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
      videos:[null,],
      order:[null],
      playlist:[null],

    })
    this.name = this.form.controls['name'];
    this.videos=this.form.controls["videos"];
    this.order=this.form.controls["order"];
    this.playlist=this.form.controls["playlist"];

  }


  ngOnInit() {
    this.buildForm();
    this.store.fetchData(this.ds.tvcategorynewsRef());
  }

  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const {name,videos,order,playlist}=f;
      const item: ITvnews = {
        key: this.ds.createId(),
        name: name,
        status: StatusObj.ACTIVE,
        create_date: new Date(),
        create_by: this.env.users,
        page_key:ConvertService.pageKey(),
        update_date: new Date(),
        update_by: this.env.users,
        videos:videos,
        order:order,
        playlist: playlist,

      }
      this.store.addNew(this.ds.tvnewsRef(),item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Videos has been created.', 'done', { duration: 2500 });
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
