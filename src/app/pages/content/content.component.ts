import { Component, OnInit, Input } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Bookstore } from 'src/app/stores/bookstore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { AddNewContentComponent } from './add-new-content/add-new-content.component';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { IContent } from 'src/app/interfaces/bookstore';
import { EditContentComponent } from './edit-content/edit-content.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentdetailComponent } from './contentdetail/contentdetail.component';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ConvertService } from 'src/app/services/convert.service';
import { Environment } from 'src/app/stores/environment.store';
import { Content_Status } from 'src/app/dummy/status';
import { AuthStore } from 'src/app/stores/auth.store';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  step = 0;
  searchValue = '';
  tabs = tabs.content;
  id;
  maxToDate= new Date();
  content: any = null;
  panelOpenState = false;
  form: FormGroup;
  fromDate: AbstractControl;
  toDate: AbstractControl;
  createBy: AbstractControl;
  fromDateKey: number;
  toDateKey: number;
  status: AbstractControl;
  statusData= Content_Status.slice(0,2);
  value;
  currentUser:any;

  constructor(
    public env : Environment,
    public store: Bookstore,
    public auth: AuthStore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder) {

      // console.log(this.auth.fetchCurrentUser().uid)
      // this.env.fetchUser(this.auth.fetchCurrentUser().uid);

      //   console.log(this.env.role)
        this.form = this.fb.group({
          fromDate: [null],
          toDate: [null],
          createBy: [this.auth.fetchCurrentUser().uid],
          status: ['all']
        });
        this.fromDate = this.form.controls['fromDate'];
        this.toDate = this.form.controls['toDate'];
        this.createBy = this.form.controls['createBy'];
        this.status = this.form.controls['status'];
    }

    // buildForm(): void {

    // }
  onPanel() {
    this.panelOpenState = !this.panelOpenState;
  }

  ngOnInit() {
    this.env.fetchData();
    this.store.fetchContentCategory();
    // this.buildForm();
    this._onFilter(this.route.snapshot.paramMap.get('id'))
  }

  _onFilter(key) {
    // this.createBy.patchValue(this.auth.fetchCurrentUser().uid);
      if(this.form.value.fromDate && this.form.value.toDate) {
        this.store.filterContent(key,this.fromDateKey,this.toDateKey,this.createBy.value,this.status.value);
      }else {
        this.store.filterContent(key,null,null,this.createBy.value,this.status.value);
      }
  }

  FilterBetweenDate() {
    if(this.form.value.fromDate && this.form.value.toDate) {
      this.fromDateKey = ConvertService.toDateKey(this.fromDate.value);
      this.toDateKey = ConvertService.toDateKey(this.toDate.value);
    }
    this._onFilter(this.route.snapshot.paramMap.get('id'))
  }
  resetDate() {
    this.fromDate.reset();
    this.toDate.reset()
    this._onFilter(this.route.snapshot.paramMap.get('id'))
  }

  create() {
    let dialogRef = this.dialog.open(AddNewContentComponent, {
      data: null,
      width: '85vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item: IContent) {
    let dialogRef = this.dialog.open(EditContentComponent, {
      data: item,
      width: '85vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }
  detail(item: IContent) {
    let dialogRef = this.dialog.open(ContentdetailComponent, {
      data: item,
      width: '85vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }


  delete(item: IContent) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete Content', memo: 'If content is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.contentcRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open('Content has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }


}
