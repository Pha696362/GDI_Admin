
import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Bookstore } from 'src/app/stores/bookstore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IContent } from 'src/app/interfaces/bookstore';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { AddNewSubCategoryComponent } from '../../sub-category/add-new-sub-category/add-new-sub-category.component';
import { EditSubCategoryComponent } from '../../sub-category/edit-sub-category/edit-sub-category.component';



@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {
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
    public dialog: MatDialog) { }

  ngOnInit() {

    this.route.params.subscribe(async param=>{
      this.id = param.id;
      // this.category = await this.store.fetchDataDoc(this.ds.categoryRef(), param.id);
      // this.title = this.category.name?this.category.name:''
      // this.store.fetchData(this.ds.subcategoryRef().doc(param.id).collection("sub_category"));
      // this.store.fetchSubCategory(param.id);
    })
  }
  _goBack() {
    this.router.navigate(['/app/content/']); 
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
