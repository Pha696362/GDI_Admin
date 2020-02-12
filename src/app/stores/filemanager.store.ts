import { DataService } from './../services/data.service';
import { observable, computed, action, autorun, toJS } from 'mobx';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class FileManagerStore {
    @observable data: any = [];
    @observable process: boolean;
    @observable loading: boolean;
    selectedFiles: any;
    uploadFolder;
    uploads: any[];

    allPercentage: Observable<any>;
    files: Observable<any>;
    constructor(
        private afs: AngularFirestore,
        private storage: AngularFireStorage,
        private ds: DataService
    ) {

    }

    @action
    addFolder(item: any, callback) {
        this.process = true;
        this.ds
            .flileFolderRef()
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
    fetchFileData(){
        this.loading = true;
        this.ds.flileRef().valueChanges().subscribe(data=>{
            if(data){
                this.data = data;
            }
            this.loading = false
        })
    }
    @action
    addFileManager(type: any, user: any, filelist: any, callback) {
        if (filelist) {
            this.process = true;
            this.uploads = [];
            const allPercentage: Observable<number>[] = [];
            for (const file of filelist) {
                // const fkey = this.afs.createId();
                const filename = Math.random().toString(36).substring(7) + new Date().getTime() + file.name;
                const path = `filemanager/${filename}`;
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
                        return this.ds.flileRef().doc(key).set({
                            key: key,
                            name: filename,
                            url: url,
                            create_date: new Date(),
                            create_by: null,
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
}
