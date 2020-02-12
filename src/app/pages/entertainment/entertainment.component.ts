import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Bookstore } from 'src/app/stores/bookstore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { EditEntertainmentComponent } from './edit-entertainment/edit-entertainment.component';
import { AddEntertainmentComponent } from './add-entertainment/add-entertainment.component';
import { IEntertainment } from 'src/app/interfaces/bookstore';
import { DeleteComponent } from 'src/app/components/delete/delete.component';

@Component({
  selector: 'app-entertainment',
  templateUrl: './entertainment.component.html',
  styleUrls: ['./entertainment.component.scss']
})
export class EntertainmentComponent implements OnInit {
  tabs = tabs.entertainment;
  constructor(
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData(this.ds.entertainmentRef());
  }

  create() {
    let dialogRef = this.dialog.open(AddEntertainmentComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item:IEntertainment ) {
    let dialogRef = this.dialog.open(EditEntertainmentComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item: IEntertainment) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete Entertainment', memo: 'If entertainment is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.genreRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open('Entertainment has been deleted.', 'done', { duration: 2000 });
         }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}