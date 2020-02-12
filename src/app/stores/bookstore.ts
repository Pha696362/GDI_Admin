
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { observable, action } from "mobx";
import { Injectable } from "@angular/core";
import { pushToArray } from '../services/utils.lib';
import { DataService } from '../services/data.service';
import { MappingService } from '../services/mapping.service';
import { ISubCategory } from '../interfaces/bookstore';
import { ConvertService } from '../services/convert.service';

@Injectable()
export class Bookstore {
  @observable data = [];
  @observable loading = true;
  @observable empty = false;
  @observable process = false;
  @observable subLoading = false;
  @observable dataTV =[];
  @observable error = [];


  @observable dataCategory: Array<any> = []
  @observable dataSubCategory: Array<any> = []

  constructor(public ds: DataService) { }

  @action
  async fetchCategory() {
    this.process = true;
    const docs = await this.ds.categoryRef().get().toPromise();

    this.process = false;
    return pushToArray(docs)
  }

  @action
  async fetchRoleForUser() {
      this.process = true;
      const docs = await this.ds.userRole().get().toPromise();
      this.process = false;
      return pushToArray(docs)
  }

  @action
  async fetchContentCategory() {
    this.process = true;
    this.ds.categoryRef().ref.get().then((item) => {
      this.dataCategory = pushToArray(item)
      this.process = false
    })
  }

  @action
  async fetchContentSubCategory(key: string) {
    this.subLoading = true;
    this.ds.subcategoryRef().ref.where("category.key", "==", key).onSnapshot((item) => {
      this.dataSubCategory = pushToArray(item)
      this.subLoading = false
    })
    this.subLoading = false
  }

  @action
  fetchDataTV(ref: AngularFirestoreCollection) {
    this.loading = true;
    ref.valueChanges().subscribe(docs => {
      this.dataTV = docs;
      this.loading = false;
    });
  }



  @action
  fetchSubCategory(key: string) {
    this.subLoading = true;
    this.ds.categoryRef().doc(key).collection('sub_category').valueChanges().subscribe(docs => {
      this.data = docs;
      this.empty = docs.length === 0;
      this.subLoading = false;
    });
  }



  @action
  async fetchTypes() {
    this.process = true;
    const docs = await this.ds.typenewsRef().get().toPromise();
    this.process = false;
    return pushToArray(docs)
  }

  @action
  async fetchGenre() {
    this.process = true;
    const docs = await this.ds.genreRef().get().toPromise();
    this.process = false;
    return pushToArray(docs)
  }

  @action
  async fetchTag() {
    this.process = true;
    const docs = await this.ds.tagRef().get().toPromise();
    this.process = false;
    return pushToArray(docs)
  }

  @action
  fetchData(ref: AngularFirestoreCollection) {
    this.loading = true;
    ref.valueChanges().subscribe(docs => {
      this.data = docs;
      this.empty = docs.length === 0;
      this.loading = false;
    });
  }

  @action
  filterContent(key?:string,fromDateKey?: number,toDateKey?:number,createBy?:string,status?:string) {
    this.loading = true;
    this.ds.contentRef(key,fromDateKey,toDateKey,createBy,status).valueChanges().subscribe(docs => {
      this.data = docs;
      this.empty = docs.length === 0;
      this.loading = false;
    });
  }

  @action
  fetchSearchContent($event) {
    this.ds.contentcRef().valueChanges().subscribe(docs => {
      const AllContent = docs.filter(ad => ad.name.indexOf($event) > -1);
      this.data = AllContent;
    });
  }


  @action
  async fetchDataDoc(ref: AngularFirestoreCollection, key) {
    const data = await ref.doc(key).get().toPromise();
    return MappingService.pushToObject(data);
  }

  @action
  addNew(ref: AngularFirestoreCollection, item: any, callback) {
    this.process = true;
    ref.doc(item.key).set(item).then(() => {
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  update(ref: AngularFirestoreCollection, item: any, callback) {
    this.process = true;
    ref.doc(item.key).update(item).then(() => {
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  delete(ref: AngularFirestoreCollection, item: any, callback) {
    this.process = true;
    // console.log(item.key)
    ref.doc(item.key).delete().then(() => {
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  updateFileUrl(ref, item: any, fileName, fileUrl, callback) {
    this.process = true;
    ref.doc(item.key).update({
      fileName: fileName,
      fileUrl: fileUrl
    }).then(() => {
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  updateDocUrl(ref, item: any, docName, docUrl, callback) {
    this.process = true;
    ref.doc(item.key).update({
      docName: docName,
      docUrl: docUrl
    }).then(() => {
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  updateInvoiceNo(callback) {
    this.ds.settingFireStore().get().then(config => {
      const setting = config.data();
      this.ds.sysSetting().update({
        invoice_no: setting.invoice_no + 1,
      }).then(() => {
        callback(true, setting)
      }).catch(error => {
        callback(false, error)
      })
    }).catch(error => {
      callback(false, error)
    })
  }
  @action
  saveSubcategory(item: any, key: any, callback) {
    this.process = true;
    const subcategoryNo = this.ds.createId();
    const batch = this.ds.batch();
    const categoryRef = this.ds.categoryFireRef().doc(key);
    const subcategoryRef = this.ds.subcategoryFireRef();

    const headerKey = this.ds.createId();
    const header: ISubCategory = {
      key: subcategoryNo,
      status: item.status,
      page_key: item.page_key,
      create_date: item.create_date,
      create_by: item.create_by,
      update_date: item.update_date,
      update_by: item.update_by,
      name: item.name,
      category: item.category
    };
    batch.set(subcategoryRef.doc(header.key), header);
    batch.set(categoryRef.collection("sub_category").doc(header.key), header);

    batch.commit().then(() => {
      this.process = false;
      callback(true, null)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  UpdateSubcategory(item: any, key: any, callback) {
    this.process = true;
    const subcategoryNo = this.ds.createId();
    const batch = this.ds.batch();
    this.ds.categoryFireRef().doc(item.category.key).collection('sub_category').doc(key).update(item).then(() => {
      this.ds.subcategoryFireRef().doc(key).update(item).then(()=> {
        // console.log('work update in collection')
      })
      .catch(error => {
        this.process = false;
        callback(false,error)
      })
      this.process = false;
      callback(true, item);
      // alert('work')
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  async CheckExistContent(kh?:string,eng?:string) {
    const title = await this.ds.contentKH(kh).get().toPromise();
    const slug = await this.ds.contentENG(eng.split(' ').join('-')).get().toPromise();
    // const founData = pushToArray(found);
    const Con_title = pushToArray(title);
    const Con_slug = pushToArray(slug);
    this.error = [];

    if(Con_title.length > 0) {
      console.log(Con_title,'errr in book store')
      const found_title = Con_title.filter(ad => ad);
      console.log(found_title,'errr in book store')
      this.error.push('This name is taken. Try another.');
    }
    if(Con_slug.length > 0) {
      this.error.push('This slug is taken. Try another.')
    }
  }
}
