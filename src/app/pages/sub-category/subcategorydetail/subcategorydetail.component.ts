
import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Bookstore } from 'src/app/stores/bookstore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IContent } from 'src/app/interfaces/bookstore';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { AddNewSubCategoryComponent } from '../add-new-sub-category/add-new-sub-category.component';
import { EditSubCategoryComponent } from '../edit-sub-category/edit-sub-category.component';
import { Environment } from 'src/app/stores/environment.store';

@Component({
  selector: 'app-subcategorydetail',
  templateUrl: './subcategorydetail.component.html',
  styleUrls: ['./subcategorydetail.component.scss']
})
export class SubcategorydetailComponent implements OnInit {
  tabs = tabs.content;
  id;
  category: any = null;
  subcategory: any = null;
  title: string = '';
  constructor(
    private router: Router,
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public route:ActivatedRoute,
    public env:Environment,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.route.params.subscribe(async param=>{
      this.id = param.id;
      this.category = await this.store.fetchDataDoc(this.ds.categoryRef(), param.id);
      this.title = this.category.name
      this.store.fetchData(this.ds.subcategoryRef().doc(param.id).collection("sub_category"));
      this.store.fetchSubCategory(param.id);
    })
  }
  _goBack() {
    this.router.navigate(['/app/subcategory/']);
  }
  create() {
    let dialogRef = this.dialog.open(AddNewSubCategoryComponent, {
      data: this.category,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0'});
  }

  edit(item: IContent) {
    let dialogRef = this.dialog.open(EditSubCategoryComponent, {
      data: item,
      width: '35vw',
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
        this.store.delete(this.ds.subcategoryRef(), item, (success, error) => {
          if (success) {
            this.ds.categoryFireRef().doc(item.category.key).collection('sub_category').doc(item.key).delete();

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
