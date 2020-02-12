import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-warning',
  templateUrl: './confirm-warning.component.html',
  styleUrls: ['./confirm-warning.component.scss']
})
export class ConfirmWarningComponent implements OnInit {

  msg: any;
  constructor(public dialogRef: MatDialogRef<ConfirmWarningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.msg = this.data;
  }
  onClose(){
    this.dialogRef.close()
  }

}
