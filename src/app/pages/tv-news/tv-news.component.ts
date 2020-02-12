import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Bookstore } from 'src/app/stores/bookstore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { AddTvNewsComponent } from './add-tv-news/add-tv-news.component';
import { EditTvNewsComponent } from './edit-tv-news/edit-tv-news.component';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { ITvnews } from 'src/app/interfaces/bookstore';
import { AddTvPlaylistNewsComponent } from './add-tv-playlist-news/add-tv-playlist-news.component';

@Component({
  selector: 'app-tv-news',
  templateUrl: './tv-news.component.html',
  styleUrls: ['./tv-news.component.scss']
})
export class TvNewsComponent implements OnInit {
  tabs = tabs.tvnews;
  tvDoc = null;
  constructor(
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchDataTV(this.ds.tvnewsRef());
  }

  create() {
    let dialogRef = this.dialog.open(AddTvNewsComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }
  createPlaylist(){
    let dialogRef = this.dialog.open(AddTvPlaylistNewsComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item:ITvnews ) {
    let dialogRef = this.dialog.open(EditTvNewsComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item: ITvnews) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete videos', memo: 'If videos is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.tvnewsRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open('Genre has been deleted.', 'done', { duration: 2000 });
         }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}