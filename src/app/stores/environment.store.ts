import { DataService } from "./../services/data.service";
import { observable, computed, action, autorun, toJS } from "mobx";
import { Injectable } from "@angular/core";
import { AuthService } from '../auth/auth.service';
import { IUser } from '../interfaces/user';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { pushToArray } from '../services/utils.lib';

@Injectable()
export class Environment {
  @observable users = null;
  @observable sysConfig = null;
  @observable role = null;
  @observable manuPermisstion:object = null;
  @observable province = null;
  @observable option = null;
  @observable config = null;
  @observable loading = false;
  @observable process = false;
  @observable data = [];
  @observable empty = false;

  constructor(
    private ds: DataService,
    private auth: AuthService
  ) {
    this.fetchCanActive(callback => {});
  }


  @action
  fetchEnvironment() {
    this.loading = true;
    this.ds.environmentRef().valueChanges().subscribe(doc => {
      this.option = doc;
      this.loading = false;
    });
  }

  @action
  fetchSysConfig(callback) {
    this.ds.sysConfigRef().valueChanges().subscribe(doc => {
      this.sysConfig = doc;
      callback(doc)
    });
  }

  @action
  fetchEnvironmentArray(callback) {
    this.loading = true;
    this.ds.environmentRef().valueChanges().subscribe(doc => {
      this.option = doc;
      this.loading = false;
      callback(doc)
    });
  }

  @action
  fetchUser(key) {
    this.loading = true;
    this.ds.userRef().doc<any>(key).valueChanges().subscribe(doc => {
      if (doc) {
        const { roles, province } = doc;
        this.users = doc;
        this.province = province;
        this.role = roles;
      }
      this.loading = false;
    });
  }

  @action
  fetchUserDoc() {
    this.loading = true;
    this.users = null;
    this.auth.canActiveRef().subscribe(users => {
      if (users) {
          const tempUser = users.uid;
          this.ds.userDocRef(tempUser).valueChanges().subscribe(docs => {
            this.users = docs;
            this.loading = false;
          })
      }
    });
  }





  @action
  fetchUserCanActive() {
    this.loading = true;
    this.auth.canActiveRef().subscribe(user => {
      this.loading = false;
    })
  }

  @action
  fetchCanActive(callback) {
    this.loading = true;
    this.auth.canActiveRef().subscribe(users => {
      if (users) {
        this.ds.userRef().doc<any>(users.uid).valueChanges().subscribe(doc => {
          this.users = doc;
          this.manuPermisstion = doc.roles.permission
          callback(doc)
          this.loading = false;
          // console.log(this.manuPermisstion)
        });
      }
      this.loading = false;
    })
  }

  @action
  fetchData() {
    this.loading = true;
    this.ds.userRef().valueChanges().subscribe(docs => {
      this.data = docs;
      this.empty = docs.length === 0;
      this.loading = false;
    })
  }

  @action
  fetchRole() {
    this.loading = true;
    this.ds.userRole().valueChanges().subscribe(docs => {
      this.data = docs;
      this.empty = docs.length === 0;
      this.loading = false;
    })
  }

  @action
  addRole(ref: AngularFirestoreCollection, item: any, callback) {
    this.loading = true;
    ref.doc(item.key).set(item).then(() => {
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
    this.loading = false;

  }
  @action
  updateRole(ref: AngularFirestoreCollection, item: any, callback) {
    this.loading = true;
    ref.doc(item.key).update(item).then(() => {
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
    this.loading = false;
  }
  @action
  deleteRole(ref: AngularFirestoreCollection, item: any, callback) {
    this.loading = true;
    ref.doc(item.key).delete().then(() => {
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
    this.loading = false;

  }

  @action
  addUser(users: IUser, callback) {
    this.process = true;
    this.ds.userRef().doc(users.key).set(users).then(() => {
      this.process = false;
      callback(true, null)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    })
  }

  @action
  updateUser(users: IUser, callback) {
    this.process = true;
    this.ds.userRef().doc(users.key).update(users).then(() => {
      this.process = false;
      callback(true, null)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    })
  }

  @action
  changePassword(users, callback) {
    this.process = true;
    var user = this.auth.authRef().currentUser;
    user.updatePassword(users.password).then(function() {
      // Update successful.
      this.process = true;
      callback('success',null)
    }).catch(error => {
      this.process = false;
      callback(error,error)
    });
  }

  @action
  deleteUser(users: IUser, callback) {
    this.process = true;
    this.ds.userRef().doc(users.key).delete().then(() => {

      this.process = false;
      callback(true, null)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    })
  }

}
