import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-warning',
  templateUrl: './modal-warning.component.html',
  styleUrls: ['./modal-warning.component.scss']
})
export class ModalWarningComponent implements OnInit {
  modal_title='';
  subtitle='';

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ModalWarningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.modal_title = this.data.title;
    this.subtitle=this.data.subtitle;
  }
  

  ngOnInit() {
  }

}
