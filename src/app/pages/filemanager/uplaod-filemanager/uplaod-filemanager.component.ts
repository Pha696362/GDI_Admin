import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileManagerStore } from 'src/app/stores/filemanager.store';

@Component({
  selector: 'app-uplaod-filemanager',
  templateUrl: './uplaod-filemanager.component.html',
  styleUrls: ['./uplaod-filemanager.component.scss']
})
export class UplaodFilemanagerComponent implements OnInit {

  disableBtn;
  selectedFiles: any;
  imgURL: any;
  message: string;
  imagePath;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UplaodFilemanagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public fm: FileManagerStore,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      file: [null, Validators.required]
    });

  }

  onSelectedFile(files) {
    this.selectedFiles = files;
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  create(f: any) {
    if (this.form.valid) {
      this.form.disable()
      this.fm.addFileManager(null, null, this.selectedFiles, (success) => {
        if (success) {
          this.dialogRef.close();
        } else {
          this.dialogRef.close();
        }
      })
    }
  }

}