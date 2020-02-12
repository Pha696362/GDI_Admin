// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-sub-category',
//   templateUrl: './sub-category.component.html',
//   styleUrls: ['./sub-category.component.scss']
// })
// export class SubCategoryComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Bookstore } from 'src/app/stores/bookstore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { IContent } from 'src/app/interfaces/bookstore';
// import { EditContentComponent } from './edit-content/edit-content.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AddNewContentComponent } from '../content/add-new-content/add-new-content.component';
import { EditContentComponent } from '../content/edit-content/edit-content.component';
import { AddNewSubCategoryComponent } from './add-new-sub-category/add-new-sub-category.component';
import { Environment } from 'src/app/stores/environment.store';

@Component({
   selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  tabs = tabs.subcategory;
  id;
  content: any = null;
  constructor(
    public env:Environment,
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public route:ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
     this.store.fetchData(this.ds.categoryRef());

  }

  create() {
    let dialogRef = this.dialog.open(AddNewSubCategoryComponent, {
      data: null,
      width: '85vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0'});
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
