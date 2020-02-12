import { DataService } from "./../services/data.service";
import { observable, computed, action, autorun, toJS } from "mobx";
import { Injectable } from "@angular/core";

@Injectable()
export class Search {
  @observable public data = null;
  @observable public loading = false;
  @observable public empty = false;
  @observable public filterType = null;

  constructor(private ds: DataService) { }

  @action
  fetchData(field, value: any) {
    this.loading = true;
    // this.ds.searchRef(field, value).valueChanges().subscribe(docs => {
    //   this.empty = docs.length === 0;
    //   this.data = docs;
    //   this.loading = false;
    // })
  }

  @action
  search(field, search) {
    // return this.ds.searchRef(field, search).valueChanges()
  }
}
