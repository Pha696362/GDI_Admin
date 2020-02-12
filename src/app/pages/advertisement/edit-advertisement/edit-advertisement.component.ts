import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { AdvertiseimageComponent } from '../../advertiseimage/advertiseimage.component';
import { ConvertService } from 'src/app/services/convert.service';
import { IAdvertise } from 'src/app/interfaces/bookstore';
import { checkExistDoc } from 'src/app/services/fire-validators.service';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PAYMENT_TYPES, Advertise_Status, MOBILE_ADVERTISEMENT_TYPE } from 'src/app/dummy/status';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Bookstore } from 'src/app/stores/bookstore';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';
import { Subscriber } from 'src/app/stores/subscriber.store';
import { ICreateBy } from 'src/app/interfaces/user';


@Component({
  selector: 'app-edit-advertisement',
  templateUrl: './edit-advertisement.component.html',
  styleUrls: ['./edit-advertisement.component.scss']
})
export class EditAdvertisementComponent implements OnInit {
  ADS = MOBILE_ADVERTISEMENT_TYPE;
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  modules = {};
  quillEditorRef;
  maxUploadFileSize = 1000000;
  disableBtn;
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  orderingNumber:AbstractControl;
  link: AbstractControl;
  package: AbstractControl;
  advertiseType: AbstractControl;
  fileurl;
  packages = [];
  newStartDate = this.data.startDate.toDate()
  newExpireDate = this.data.expireDate.toDate();
  newExpireDateKey = this.data.expireDateKey;
  status = Advertise_Status.find(ads => ads.key == this.data.status.key);

  constructor(
    public dialogRef: MatDialogRef<EditAdvertisementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store: Bookstore,
    private ds: DataService,
    private dialog: MatDialog,
    private pk : Subscriber
  ) {}

  buildForm(): void {
    this.form = this.fb.group({
      orderingNumber:[this.data.orderingNumber],
      name:[this.data.name],
      link: [this.data.link],
      startDate: [this.data.startDate.toDate()],
      expireDate: [this.data.expireDate.toDate()],
      advertiseType: [MOBILE_ADVERTISEMENT_TYPE.find(ads => ads.key === this.data.advertiseType.key)],
      advertiseStatus: [null],
      package: ['not']
    });
    this.orderingNumber = this.form.controls["orderingNumber"];
    this.name = this.form.controls["name"];
    this.link = this.form.controls["link"];
    this.fileurl = this.data.fileurl;
    this.package = this.form.controls["package"];
    this.advertiseType = this.form.controls["advertiseType"]
  }
  async ngOnInit() {
    this.buildForm();
    this.packages = await this.pk.fetchPackage();
    if(this.data.status.key === 4) {
      this.newStartDate = new Date();
      this.newExpireDate = new Date();
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }

  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const { name, advertiseType, link, startDate,orderingNumber } = f;
      let pkData = {};
      if(this.package.value !== 'not') {
        // console.log(this.package.value)
        if(this.data.status.key === 4){
          this.status = Advertise_Status.find(ads => ads.key == 1);
        }
        pkData = {
        key: this.package.value.key,
        pkname: this.package.value.name,
        period: this.package.value.period,
        price: this.package.value.price,
        discount: this.package.value.discount,
        create_at: this.package.value.create_date.toDate()
        }
        this.newExpireDate = moment(this.data.expireDate.toDate()).add(this.package.value.period, 'days').toDate();
        this.newExpireDateKey = ConvertService.toDateKey(this.newExpireDate);

      }
      else {
        // console.log(this.data.package)
        pkData = {
          key : this.data.package.key,
          pkname : this.data.package.pkname,
          period : this.data.package.period,
          price : this.data.package.price,
          discount: this.data.package.discount,
          create_at: this.data.package.create_at
        }
      }
      const create_by:ICreateBy = {
        key: this.env.users.key,
        name: this.env.users.name,
        email: this.env.users.email
      };
      const item: IAdvertise = {
        orderingNumber:orderingNumber,
        key: this.data.key,
        name: name,
        link: link,
        package: pkData,
        startDate: this.newStartDate,
        expireDate: this.newExpireDate,
        expireDateKey: this.newExpireDateKey,
        fileurl: this.fileurl ? this.fileurl : null,
        advertiseType: advertiseType,
        create_date: this.data.create_date,
        create_by: create_by,
        page_key: ConvertService.pageKey(),
        update_date: this.data.update_date,
        update_by: create_by,
        status: this.status
      };
      this.store.update(this.ds.mobileAdvertiseRef(), item, (success, error) => {
        if (success) {
          if (!isNew) this.dialogRef.close();
          this.snackBar.open("Advertisement bottom has been created.", "done", {
            duration: 2500
          });
          this.form.enable();
          this.form.reset();
          // this.inputEl.nativeElement.focus();
        } else {
          alert(error);
        }
      });
    }
  }

  showFileManager() {
    // this.disableBtn = true
    let dialogRef = this.dialog.open(AdvertiseimageComponent, {
      data: null,
      panelClass: "cs-overlay-panel",
      width: "60vw",
      height: "100vh",
      disableClose: true,
      role: "dialog",
      hasBackdrop: false
    });
    dialogRef.updatePosition({ top: "0", right: "0", bottom: "0" });
    dialogRef.afterClosed().subscribe(result => {
      // const range = this.quillEditorRef.getSelection(true);
      if (result) {
        for (const file of result) {
          this.fileurl = file.url;
          // this.quillEditorRef.insertEmbed(range.index, 'image', file.url, 'user')
        }
      }

      // this.disableBtn = false;
    });
  }
}
