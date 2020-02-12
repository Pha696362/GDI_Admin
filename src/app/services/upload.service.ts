import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Upload } from '../dummy/upload';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable()
export class UploadService {

  uploads: Observable<Upload[]>;

  constructor(private afs: AngularFirestore) { }

  pushUpload(upload: Upload, basePath: any, key: string) {
    const storageRef = firebase.storage().ref();
    const filename = Math.random().toString(36).substring(7) + new Date().getTime() + upload.file.name;

    const uploadTask = storageRef.child(basePath + '/' + key + '/' + filename).put(upload.file);
    const dataRef = this.afs.collection(basePath).doc(key);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
      },
      (error) => {
        
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const data = {
            filename: filename,
            fileurl: downloadURL,
          };
          dataRef.update(data);
        });

        return undefined;
      }
    );
  }

  uploadListingImage(upload: Upload, basePath: any, projectKey: string, key: string, isCover: boolean) {
    const storageRef = firebase.storage().ref();
    const filename = Math.random().toString(36).substring(7) + new Date().getTime() + upload.file.name;

    const uploadTask = storageRef.child(basePath + '/' + key + '/' + filename).put(upload.file);
    const batch = this.afs.firestore.batch();
    const dataRef = this.afs.firestore.collection(basePath).doc(projectKey)

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
      },
      (error) => {
        
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const data = {
            filename: filename,
            fileurl: downloadURL,
          };
          if(isCover)
            batch.update(dataRef, data);
          batch.update(dataRef.collection("images").doc(key),data);

          batch.commit();
        });

        return undefined;
      }
    );
  }

  pushUploadCover(upload: Upload, upload1: Upload, basePath: any, key: string) {
    const storageRef = firebase.storage().ref();
    const dataRef = this.afs.collection(basePath).doc(key);
    if (upload.file) {
      const filename = Math.random().toString(36).substring(7) + new Date().getTime() + upload.file.name;
      const uploadTask = storageRef.child(basePath + '/' + key + '/' + filename).put(upload.file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        },
        (error) => {
          
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const data = {
              bannername: filename,
              bannerurl: downloadURL,
            };
            dataRef.update(data);
          });
          return undefined;
        }
      );
    }

    if (upload1.file) {
      const filename = Math.random().toString(36).substring(7) + new Date().getTime() + upload1.file.name;

      const uploadTask1 = storageRef.child(basePath + '/' + key + '/' + filename).put(upload1.file);
      uploadTask1.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          upload1.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        },
        (error) => {
          
        },
        () => {
          uploadTask1.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const data = {
              covername: filename,
              coverurl: downloadURL,
            };
            dataRef.update(data);
          });
          return undefined;
        }
      );
    }
  }

  pushUploadOverview(upload: Upload, upload1: Upload, upload2: Upload, basePath: any, key: string) {
    const storageRef = firebase.storage().ref();
    const dataRef = this.afs.collection(basePath).doc(key);
    if (upload.file) {
      const filename = Math.random().toString(36).substring(7) + new Date().getTime() + upload.file.name;
      const uploadTask = storageRef.child(basePath + '/' + key + '/' + filename).put(upload.file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        },
        (error) => {
          
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const data = {
              bannername: filename,
              bannerurl: downloadURL,
            };
            dataRef.update(data);
          });
          return undefined;
        }
      );
    }

    if (upload1.file) {
      const filename = Math.random().toString(36).substring(7) + new Date().getTime() + upload1.file.name;

      const uploadTask1 = storageRef.child(basePath + '/' + key + '/' + filename).put(upload1.file);
      uploadTask1.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          upload1.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        },
        (error) => {
          
        },
        () => {
          uploadTask1.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const data = {
              covername: filename,
              coverurl: downloadURL,
            };
            dataRef.update(data);
          });
          return undefined;
        }
      );
    }


    if (upload2.file) {
      const filename = Math.random().toString(36).substring(7) + new Date().getTime() + upload2.file.name;

      const uploadTask = storageRef.child(basePath + '/' + key + '/' + filename).put(upload2.file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          upload2.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        },
        (error) => {
          
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const data = {
              location_filename: filename,
              location_fileurl: downloadURL,
            };
            dataRef.update(data);
          });
          return undefined;
        }
      );
    }
  }



  pushUploadMulti(upload: Upload, upload1: Upload, upload2: Upload, upload3: Upload, basePath: any, key: string) {
    const storageRef = firebase.storage().ref();
    const dataRef = this.afs.collection(basePath).doc(key);
    if (upload.file) {
      const filename = Math.random().toString(36).substring(7) + new Date().getTime() + upload.file.name;
      const uploadTask = storageRef.child(basePath + '/' + key + '/' + filename).put(upload.file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        },
        (error) => {
          
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const data = {
              filename: filename,
              fileurl: downloadURL,
            };
            dataRef.update(data);
          });
          return undefined;
        }
      );
    }

    if (upload1.file) {
      const filename = Math.random().toString(36).substring(7) + new Date().getTime() + upload1.file.name;

      const uploadTask1 = storageRef.child(basePath + '/' + key + '/' + filename).put(upload1.file);
      uploadTask1.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          upload1.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        },
        (error) => {
          
        },
        () => {
          uploadTask1.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const data = {
              filename1: filename,
              fileurl1: downloadURL,
            };
            dataRef.update(data);
          });
          return undefined;
        }
      );
    }

    
    if (upload2.file) {
      const filename = Math.random().toString(36).substring(7) + new Date().getTime() + upload2.file.name;

      const uploadTask2 = storageRef.child(basePath + '/' + key + '/' + filename).put(upload2.file);
      uploadTask2.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          upload2.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        },
        (error) => {
          
        },
        () => {
          uploadTask2.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const data = {
              filename2: filename,
              fileurl2: downloadURL,
            };
            dataRef.update(data);
          });
          return undefined;
        }
      );
    }

    
    if (upload3.file) {
      const filename = Math.random().toString(36).substring(7) + new Date().getTime() + upload3.file.name;

      const uploadTask3 = storageRef.child(basePath + '/' + key + '/' + filename).put(upload3.file);
      uploadTask3.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          upload3.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        },
        (error) => {
          
        },
        () => {
          uploadTask3.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const data = {
              filename3: filename,
              fileurl3: downloadURL,
            };
            dataRef.update(data);
          });
          return undefined;
        }
      );
    }
  }

  deleteFileData(basePath: any, key: string) {
    return this.afs.collection(basePath).doc(key).delete();
  }
  
  deleteFileStorage(basePath: any, key: string, name: string) {
    const storageRef = firebase.storage().ref();
    return storageRef.child(`${basePath}/${key}/${name}`).delete();
  }

  deleteFileStorageMulti(basePath: any, key: string, name: string, name1: string, name2: string, name3: string) {
    const storageRef = firebase.storage().ref();
    if(name){
      return storageRef.child(`${basePath}/${key}/${name}`).delete();
    }
    if(name1){
      return storageRef.child(`${basePath}/${key}/${name1}`).delete();
    }
    if(name2){
      return storageRef.child(`${basePath}/${key}/${name2}`).delete();
    }
    if(name3){
      return storageRef.child(`${basePath}/${key}/${name3}`).delete();
    }
  }

}
