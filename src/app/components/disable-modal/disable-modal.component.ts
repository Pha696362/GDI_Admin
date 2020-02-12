import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-disable-modal',
  templateUrl: './disable-modal.component.html',
  styleUrls: ['./disable-modal.component.scss']
})
export class DisableModalComponent implements OnInit {
  process = false;
  constructor(
    public dialogRef: MatDialogRef<DisableModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
    
  }

  disable(){}
  
}
