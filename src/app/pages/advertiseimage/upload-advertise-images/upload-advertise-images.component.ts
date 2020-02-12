import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdvertisementStore } from 'src/app/stores/advertisement.store';


@Component({
  selector: 'app-upload-advertise-images',
  templateUrl: './upload-advertise-images.component.html',
  styleUrls: ['./upload-advertise-images.component.scss']
})
export class UploadAdvertiseImagesComponent implements OnInit {
  disableBtn;
  selectedFiles: any;
  imgURL: any;
  message: string;
  imagePath;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UploadAdvertiseImagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public fm: AdvertisementStore,
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
      this.fm.addAdvertise(null, null, this.selectedFiles, (success) => {
        if (success) {
          this.dialogRef.close();
        } else {
          this.dialogRef.close();
        }
      })
    }
  }

}