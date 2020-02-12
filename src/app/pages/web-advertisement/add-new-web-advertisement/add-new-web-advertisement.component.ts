import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject
} from "@angular/core";
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar,
  MatDialog
} from "@angular/material";
import { Environment } from "src/app/stores/environment.store";
import { Bookstore } from "src/app/stores/bookstore";
import { DataService } from "src/app/services/data.service";
import { IAdvertise } from "src/app/interfaces/bookstore";
import { WEB_ADVERTISEMENT_TYPE, Advertise_Status } from "src/app/dummy/status";
import { ConvertService } from "src/app/services/convert.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { checkExistDoc } from "src/app/services/fire-validators.service";
import { FilemanagerComponent } from "../../filemanager/filemanager.component";
import { AdvertiseimageComponent } from "../../advertiseimage/advertiseimage.component";
import { Subscriber } from 'src/app/stores/subscriber.store';
import * as moment from 'moment';
import { ICreateBy } from 'src/app/interfaces/user';

@Component({
  selector: 'app-add-new-web-advertisement',
  templateUrl: './add-new-web-advertisement.component.html',
  styleUrls: ['./add-new-web-advertisement.component.scss']
})
export class AddNewWebAdvertisementComponent implements OnInit {
  ADS = WEB_ADVERTISEMENT_TYPE;
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  modules = {};
  quillEditorRef;
  maxUploadFileSize = 1000000;
  disableBtn;
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  orderingNumber: AbstractControl;
  category: AbstractControl;
  startDate: AbstractControl;
  link: AbstractControl;
  package: AbstractControl;
  position: AbstractControl;
  advertisetype: AbstractControl;
  // category_lists = [];
  status = Advertise_Status.find(ads => ads.key == 1);
  fileurl;
  packages=[];
  minDate = new Date();
  selectedAdsType = {};


  constructor(
    public dialogRef: MatDialogRef<AddNewWebAdvertisementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store: Bookstore,
    private afs: AngularFirestore,
    private ds: DataService,
    private dialog: MatDialog,
    private pk : Subscriber
  ) { }


  buildForm(): void {
    this.form = this.fb.group({
      name: [
        null,
        Validators.compose([Validators.required]),
        checkExistDoc(this.afs, "courses", "name")
      ],
      link: [null, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      orderingNumber: [null, Validators.required],
      startDate: [new Date()],
      // startDate: {required : true, disabled : true},
      // expireDate: [null, Validators.required],
      category: [null],
      package:[null],
      advertisetype: [null],
    });
    this.orderingNumber = this.form.controls["orderingNumber"];
    this.name = this.form.controls["name"];
    this.link = this.form.controls["link"];
    // this.advertiseType = this.form.controls["advertiseType"];
    this.category = this.form.controls["category"];
    this.package = this.form.controls["package"];
    this.advertisetype = this.form.controls["advertisetype"];
    // this.startDate.disable();
  }

  async ngOnInit() {
    this.buildForm();
    // this.category_lists = await this.store.fetchCategory();
    // this.category.patchValue(this.category_lists[0]);
    this.packages = await this.pk.fetchPackage();
    this.package.patchValue(this.packages[0]);
    this.env.fetchUserCanActive();
    this.advertisetype.patchValue(this.data);
  }

  onChange(event) {
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }

  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      let CalexpireDate;
      if(f.startDate <= new Date()) {
        this.status = Advertise_Status.find(ads => ads.key == 1);
      }
      else {
        this.status = Advertise_Status.find(ads => ads.key == 3);
      }
      CalexpireDate =  moment(f.startDate).add((f.package.period), 'days').toDate();
      console.log(ConvertService.toDateKey(CalexpireDate));
      const {
        name,
        advertisetype,
        link,
        startDate,
        orderingNumber,
      } = f;
      const pkData = {
        key: this.package.value.key,
        pkname: this.package.value.name,
        period: this.package.value.period,
        price: this.package.value.price,
        discount: this.package.value.discount,
        create_at: this.package.value.create_date
      }
      // const advertiseTypeKey = advertiseType.map(m => m.key);
      const create_by:ICreateBy = {
        key: this.env.users.key,
        name: this.env.users.name,
        email: this.env.users.email
      };
      const item: IAdvertise = {
        key: this.ds.createId(),
        name: name,
        link: link,
        orderingNumber: orderingNumber,
        startDate: startDate,
        expireDate: CalexpireDate,
        expireDateKey: ConvertService.toDateKey(CalexpireDate),
        fileurl: this.fileurl ? this.fileurl : null,
        advertiseType: advertisetype,
        create_date: new Date(),
        create_by: create_by,
        page_key: ConvertService.pageKey(),
        update_date: new Date(),
        update_by: create_by,
        package: pkData,
        status: this.status
      };
      this.store.addNew(this.ds.webAdvertiseRef(), item, (success, error) => {
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
