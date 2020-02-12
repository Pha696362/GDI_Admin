import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog, MatListOption } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { FileManagerStore } from 'src/app/stores/filemanager.store';
import { UplaodFilemanagerComponent } from './uplaod-filemanager/uplaod-filemanager.component';

@Component({
  selector: 'app-filemanager',
  templateUrl: './filemanager.component.html',
  styleUrls: ['./filemanager.component.scss']
})
export class FilemanagerComponent implements OnInit {
  disableBtn
  constructor(
    public dialogRef: MatDialogRef<FilemanagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public fm: FileManagerStore,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fm.fetchFileData();
  }
  current_selected: any;
  onSelection(options:MatListOption[]){
   this.current_selected = options.map(o => {
     return o.value
   })
  }

  showUploadFile() {
    this.disableBtn = true
    let dialogRef = this.dialog.open(UplaodFilemanagerComponent, {
      data: null,
      panelClass: 'cs-overlay-panel',
      width: '',
      height: '',
      // disableClose: true,
      role: 'dialog',
      // hasBackdrop:false,
    });
    // dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
    dialogRef.afterClosed().subscribe(result => {
      this.disableBtn = false;
    });
  }
}
