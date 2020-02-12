import { FormGroup } from '@angular/forms';
import { AuthService } from "./../auth/auth.service";
import { Environment } from "./../stores/environment.store";
import { observable, computed, action, autorun, toJS } from "mobx";
import { Injectable } from "@angular/core";
import { DataService } from "../services/data.service";
import { Router } from '@angular/router';
import { ApiService, Utils } from '../services/api.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser } from '../interfaces/user';

@Injectable()
export class AuthStore {
  @observable public loading = false;
  @observable public process = false;
  @observable public user = null;
  @observable public error = null;
  @observable public displayName = null;

  constructor(
    private ds: DataService,
    private router: Router,
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private api: ApiService,
    private env: Environment,

  ) {
    this.fetchCanActive();
  }

  @action
  signOut() {
    this.auth.authRef().signOut().then(() => {
      this.router.navigate(['/auth']);
    });
  }

  @action
  signUp(f: any, callback) {
    this.process = true;
    const { email, password } = f;
    this.auth.authRef().createUserWithEmailAndPassword(email, password).then(async (user) => {
            f.key = user.user.uid;
                const item: IUser = {
                  key: user.user.uid,
                  create_date : new Date(),
                  email: f.email,
                  name: f.name,
                  description: f.description,
                  facebook: f.facebook,
                  googleplus: f.googleplus,
                  linkin: f.linkin,
                  phone: f.phone,
                  profile: f.profile,
                  roles: f.roles,
                  create_by: f.create_by,
                  update_by: f.create_by
                }
            this.ds.userRef().doc(user.user.uid).set(item).then(() => {
              user.user.sendEmailVerification().then(() => {
                this.process = false;
                callback(true, null);
              }).catch(error => {
                alert(error + '1');
                this.process = false;
                callback(false, error);
              });
              this.process = false;
            }).catch(error => {
            alert(error + '3');
            this.process = false;
            });
    }).catch(error => {
      alert('2' + error);
      this.process = false;
    });
  }

  @action
  async signIn(form: any) {
    this.process = true;
    this.error = null;
    const { email, password } = form;
    return this.auth.authRef().signInWithEmailAndPassword(email, password).then(user => {
      if (user) {
        // const email = "yep@gmail.com";
        // const password = "123456";

        // this.api.login(`${this.api.baseUri}authenticate?email=${email}&password=${password}`).then((res)=>{
        //   Utils.setLocalstorageItem('token', res.token);

        // })
        this.user = user.user;
        this.router.navigate(['/']);
        this.process = false;
        return user;
      }
      else {
        this.error = "Invalid email and password.";
        this.process = false;
        return null;
      }
    }).catch(error => {
      this.error = "Invalid email and password.";
      this.process = false;
      return null;
    })
  }

  @action
  fetchCanActive() {
    this.loading = true;
    this.auth.canActiveRef().subscribe(user => {
      this.user = user;
      this.displayName = null;
      if (user) {
        this.displayName = user.displayName;
        this.user = {
          key: user.uid,
          name: user.displayName,
          email: user.email,
        }
      }
      this.loading = false;
    })
  }

  @action
  fetchCurrentUser() {
    return this.auth.authRef().currentUser;
  }

  @action
  getUser() {
    const { uid, displayName, email, phoneNumber, photoURL } = this.auth.authRef().currentUser
    return {
      key: uid,
      displayName, email, phoneNumber, photoURL,
      uid,
    }
  }

  @action
  resetPassword(email) {
    return this.auth.authRef().sendPasswordResetEmail(email);
  }

}
