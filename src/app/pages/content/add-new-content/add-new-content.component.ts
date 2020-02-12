import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Content_Status } from 'src/app/dummy/status';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Bookstore } from 'src/app/stores/bookstore';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/services/data.service';
import { checkExistDoc, checkExistSlug } from 'src/app/services/fire-validators.service';
import { ConvertService } from 'src/app/services/convert.service';
import { IContent } from 'src/app/interfaces/bookstore';
import { tabs } from 'src/app/dummy/tabs';
import { province } from '../../../dummy/report'
import { FilemanagerComponent } from '../../filemanager/filemanager.component';
import { AdvertiseimageComponent } from '../../advertiseimage/advertiseimage.component';
import Quill from 'quill'
import ImageResize from 'quill-image-resize-module'
import { ImageDrop } from 'quill-image-drop-module';
import { ICreateBy } from 'src/app/interfaces/user';
Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop);
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-new-content',
  templateUrl: './add-new-content.component.html',
  styleUrls: ['./add-new-content.component.scss']
})
export class AddNewContentComponent implements OnInit {
  panelOpenState = false;
  disableBtn;
  tabs = tabs.content;
  modules = {};
  quillEditorRef;
  maxUploadFileSize = 1000000;
  @ViewChild('focusInput') inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  status: AbstractControl;
  createname: AbstractControl;
  editname: AbstractControl;
  reference: AbstractControl;
  locations: AbstractControl;
  category: AbstractControl;
  advertiseType: AbstractControl;
  slug: AbstractControl;
  category_lists = [];
  type_lists = [];
  paymentData = Content_Status;
  fileurl;

  constructor(
    public dialogRef: MatDialogRef<AddNewContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store: Bookstore,
    private afs: AngularFirestore,
    private ds: DataService,
    private dialog: MatDialog,
  ) {

    this.modules = {
      imageResize: {
        modules: ['Resize', 'DisplaySize', 'Toolbar']
      },
      imageDrop: true,
      syntax: false,
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],                                         // remove formatting button
        ['link', 'video',],
      ],

    };
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required]), checkExistDoc(this.afs, "content", "name")],
      slug:[null, Validators.compose([Validators.required]), checkExistSlug(this.afs, "content","slug")],
      createname: [null],
      status: [null, Validators.required],
      reference: [null],
      locations: [null],
      editname: [null, Validators.required],
      description: [null],
      category: [null, Validators.required],
      advertiseType: [null],
      subCategory: [null],
    });
    this.name = this.form.controls['name'];
    this.status = this.form.controls['status'];
    this.category = this.form.controls['category'];
    this.createname = this.form.controls['createname'];
    this.reference = this.form.controls['reference'];
    this.editname = this.form.controls['editname'];
    this.locations = this.form.controls['locations'];
    this.advertiseType = this.form.controls['advertiseType'];
    this.slug = this.form.controls['slug'];
  }

  async ngOnInit() {
    this.buildForm();
    this.store.fetchContentCategory();
    // this.category.patchValue(this.category_lists[0]);
    // this.store.fetchContentSubCategory(this.store.dataCategory[0].key);
    this.type_lists = await this.store.fetchTypes();
    // this.type.patchValue(this.type_lists[0]);
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) { return o1.key === o2.key; }
  }
  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const { advertiseType, name, createname, reference, editname, locations, category, subCategory, status, slug } = f;

      const advertiseTypeKey = advertiseType ? advertiseType.map(m => (m.key)) : null;
      const create_by:ICreateBy = {
        key: this.env.users.key,
        name: this.env.users.name,
        email: this.env.users.email
      };
      const item: IContent = {
        key: this.ds.createId(),
        name: name,
        slug: slug.split(' ').join('-'),
        status: status,
        editname: editname,
        locations: locations,
        createname: createname,
        reference: reference,
        category: category,
        createDateKey: ConvertService.toDateKey(new Date()),
        sub_category: subCategory ? subCategory : null,
        create_date: new Date(),
        create_by: create_by,
        page_key: ConvertService.pageKey(),
        update_date: new Date(),
        update_by: create_by,
        fileurl: this.fileurl ? this.fileurl : null,
        advertiseType: advertiseType,
        advertiseTypeKey: advertiseTypeKey,
        top_view: 1,
      };
      this.store.addNew(this.ds.contentcRef(), item, (success, error) => {
        if (success) {
          if (!isNew) {
            this.dialogRef.close();
            this.snackBar.open('Content has been created.', 'done', { duration: 2500 });
            this.form.enable();
            this.form.reset();
          }

        } else {
          alert(error);
        }
      });
    }
  }

  showFileManager() {
    this.disableBtn = true;
    const dialogRef = this.dialog.open(FilemanagerComponent, {
      data: null,
      panelClass: 'cs-overlay-panel',
      width: '50vw',
      height: '100vh',
      disableClose: true,
      role: 'dialog',
      hasBackdrop: false,
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
    dialogRef.afterClosed().subscribe(result => {
      const range = this.quillEditorRef.getSelection(true);
      if (result) {
        for (const file of result) {
          this.quillEditorRef.insertEmbed(range.index, 'image', file.url, 'user');
        }
      }

      this.disableBtn = false;
    });
  }

  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
    const toolbar = editorInstance.getModule('toolbar');

  }
  addImage() {
    const range = this.quillEditorRef.getSelection(true);

    this.quillEditorRef.insertEmbed(range.index, 'image', 'https://cloud.githubusercontent.com/assets/2264672/20601381/a51753d4-b258-11e6-92c2-1d79efa5bede.png', 'user')
  }
  onContentChanged(editorInstance: any) {
    const range = editorInstance.text;

    const regex = /https?:\/\/[^\s]+/g;

  }

  imageHandler = (image, callback) => {
    const range = this.quillEditorRef.getSelection();
    const img = '<p><img src="https://firebasestorage.googleapis.com/v0/b/puconline-c176c.appspot.com/o/logo%2FLogo-PUC-Final-01.png?alt=media&token=938f845e-a46b-454d-9d9a-69ee2f4c1d03"/></p>';
    this.quillEditorRef.clipboard.dangerouslyPasteHTML(range.index, img);
  }

  _onSelectCategory(value) {
    this.store.fetchContentSubCategory(value.key);
  }


  //advertisement
  showimage() {
    // this.disableBtn = true
    const dialogRef = this.dialog.open(AdvertiseimageComponent, {
      data: null,
      panelClass: 'cs-overlay-panel',
      width: '50vw',
      height: '100vh',
      disableClose: true,
      role: 'dialog',
      hasBackdrop: false,
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
    dialogRef.afterClosed().subscribe(result => {
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
