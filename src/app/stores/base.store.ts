import { observable, action } from "mobx";
import { Injectable } from "@angular/core";
import { DataService } from '../services/data.service';

@Injectable()
export class BaseStore {
  @observable data = null;
  @observable loading = false;
  @observable empty = false;
  @observable process = false;

  constructor(private ds: DataService) { }

  @action
  fetchData(col: string) {
    this.loading = true;
    this.data = null;
    this.empty = false;
    this.ds.baseDocRef(col).valueChanges().subscribe(docs => {
      this.data = docs;
      this.empty = docs.length === 0;
      this.loading = false;
    });
  }

  @action
  addNew(col: string, item: any, callback) {
    this.process = true;
    this.ds.baseDocRef(col).doc(item.key).set(item).then(() => {
      this.process = false;
      callback(true, null);
    }).catch(error => {
      this.process = false;
      callback(false, error);
    })
  }

  @action
  update(col: string, item: any, callback) {
    this.process = true;
    this.ds.baseDocRef(col).doc(item.key).update(item).then(() => {
      this.process = false;
      callback(true, null);
    }).catch(error => {
      this.process = false;
      callback(false, error);
    })
  }

  @action
  delete(col: string, item: any, callback) {
    this.loading = true;
    this.ds.baseDocRef(col).doc(item.key).delete().then(() => {
      this.loading = false;
      callback(true, null);
    }).catch(error => {
      this.loading = false;
      callback(false, error);
    })
  }

}
