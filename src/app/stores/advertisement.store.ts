import { DataService } from './../services/data.service';
import { observable, computed, action, autorun, toJS } from 'mobx';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { pushToArray } from '../services/utils.lib';
import { ConvertService } from '../services/convert.service';
import { Advertise_Status } from 'src/app/dummy/status';
import { Environment } from 'src/app/stores/environment.store'

@Injectable()
export class AdvertisementStore {
    @observable data: any = [];
    @observable advertise_manager = [];
    @observable process: boolean;
    @observable loading: boolean;
    @observable empty :boolean = false;
    @observable tab :string;
    selectedFiles: any;
    uploadFolder;
    uploads: any[];

    allPercentage: Observable<any>;
    files: Observable<any>;
    constructor(
        private afs: AngularFirestore,
        private storage: AngularFireStorage,
        private ds: DataService,
        private env: Environment
    ) {

    }

    @action
    addFolder(item: any, callback) {
        this.process = true;
        this.ds
            .AdvertiseFolderRef()
            .doc(item.key)
            .set(item)
            .then(() => {
                this.process = false;
                callback(true, null);
            })
            .catch(error => {
                this.process = false;
                callback(false, error);
            });
    }



    @action
    fetchAdvertiseData(){
        this.loading = true;
        this.ds.advertisementRef().valueChanges().subscribe(docs => {
            if(docs){
              this.advertise_manager = docs;
              this.empty = docs.length === 0;
            }
            this.loading = false
        })
    }

    // @action
    // fetchAdvertiseData(callback){
    //     this.loading = true;
    //     this.ds.advertisementRef().valueChanges().subscribe(docs => {
    //         if(docs){
    //           this.advertise_manager = docs;
    //           callback(this.advertise_manager)
    //         }else{
    //           callback(null)
    //         }
    //         this.loading = false
    //     })
    // }

    // @action
    // fetchAdsById(key) {
    //   this.loading = true;
    //   this.ds.adsRef(key).valueChanges().subscribe(docs => {
    //     this.data = docs;
    //     this.empty = docs.length === 0;
    //     this.loading = false;
    //   });
    // }

    @action
    fetchAdsByFilter(tab : string,key : number,name : string) {
      this.loading = true;
      this.tab = tab;
      this.ds.adsRefFilter(this.tab,key,name).valueChanges().subscribe(docs => {

        const tempExpire = docs.filter(found => found.expireDateKey < ConvertService.toDateKey(new Date()) && found.status.key === 1);
          if(tempExpire) {
            for(let i = 0 ;i < tempExpire.length; i++){
              const status = Advertise_Status.find(adStatus => adStatus.key === 4);
              this.afs.collection(name).doc(tempExpire[i].key).update({status: status}).then(() => {
            }).catch(error => {
              console.log(error)
            });
            }
          }
        this.data = docs;
        this.empty = docs.length === 0;
        this.loading = false;
      });
    }

    @action
    addAdvertise(type: any, user: any, filelist: any, callback) {
        if (filelist) {
            this.process = true;
            this.uploads = [];
            const allPercentage: Observable<number>[] = [];
            for (const file of filelist) {
                // const fkey = this.afs.createId();
                const filename = Math.random().toString(36).substring(7) + new Date().getTime() + file.name;
                const path = `advertisementImage/${filename}`;
                // const path = `filemanager/${type.key}/${filename}`;
                const ref = this.storage.ref(path);
                const task = this.storage.upload(path, file);
                const _percentage$ = task.percentageChanges();
                allPercentage.push(_percentage$);

                const uploadTrack = {
                    fileName: filename,
                    percentage: _percentage$
                }
                this.uploads.push(uploadTrack);
                const key = this.afs.createId();
                const _t = task.then((f) => {
                    return f.ref.getDownloadURL().then((url) => {
                        return this.ds.advertisementRef().doc(key).set({
                            key: key,
                            name: filename,
                            url: url,
                            create_date: new Date(),
                            create_by: this.env.users,
                        }).then(() => {
                            this.process = false;
                            callback(true, null);
                        }).catch(error => {
                            this.process = false;
                            callback(false, error);
                        });
                    })
                })
            }
            this.allPercentage = combineLatest(allPercentage)
                .pipe(
                    map((percentages) => {
                        let result = 0;
                        for (const percentage of percentages) {
                            result = result + percentage;
                        }
                        return result / percentages.length;
                    }),
                    tap(console.log)
                );
        }
        callback(true, null);
    }

    @action
    delete(item: any, callback) {
    this.process = true;
    this.afs.doc(item.key).delete().then(() => {
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }
}
