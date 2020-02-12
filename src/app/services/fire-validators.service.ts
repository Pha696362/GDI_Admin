import { AbstractControl } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";

import { Injectable } from "@angular/core";
import { map, take, debounceTime } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FireValidatorsService {
  constructor() {}

  static checkExistFromArray(data:Array<any>, field: string) {
    return (control: AbstractControl) => {
      const value = control.value;
      if (value !== null && value !== "" && value !== undefined) {
        const list=data.filter(m=>m[field]===value);
        const val = list.length == 1 ? { nameAvailable: true } : null;
        return val;
      }
    };
  }


  static checkExist(afs: AngularFirestore, collection: string, field: string) {
    return (control: AbstractControl) => {
      const value = control.value;
      if (value !== null && value !== "" && value !== undefined) {
        return afs
          .collection(collection, ref => ref.where(field, "==", value))
          .valueChanges()
          .pipe(
            debounceTime(300),
            take(1),
            map(arr => {
              const val = arr.length == 1 ? { nameAvailable: true } : null;
              return val;
            })
          );
      }
    };
  }

  static checkValid(afs: AngularFirestore, collection: string, field: string) {
    return (control: AbstractControl) => {
      const value = control.value;
      if (value !== null && value !== "" && value !== undefined) {
        return afs
          .collection(collection, ref => ref.where(field, "==", value))
          .valueChanges()
          .pipe(
            debounceTime(300),
            take(1),
            map(arr => {
              const val = arr.length == 1 ? null:{ nameAvailable: true };
              return val;
            })
          );
      }
    };
  }

}

export function checkExistOnEdit(afs: AngularFirestore, collection: string, field: string,oldValue:string) {
  return (control: AbstractControl) => {
    const value = control.value;
    if (value !== null && value !== "" && value !== undefined) {
      return afs
        .collection(collection, ref => ref
          .where(field, "==", value))
        .valueChanges()
        .pipe(
          debounceTime(300),
          take(1),
          map(arr => {
            if(oldValue===value){
              return null;
            }
            const val = arr.length >0 ? { nameAvailable: true } : null;
            return val;
          })
        );
    }
  };
}

export function checkExistDoc(afs: AngularFirestore, collection: string, field: string) {
  return (control: AbstractControl) => {
    const value = control.value;
    if (value !== null && value !== "" && value !== undefined) {
      return afs
        .collection(collection, ref => ref.where(field, "==", value))
        .valueChanges()
        .pipe(
          debounceTime(300),
          take(1),
          map(arr => {
            const val = arr.length == 1 ? { nameAvailable: true } : null;
            return val;
          })
        );
    }
  };
}

export function checkExistSlug(afs: AngularFirestore, collection: string, field: string) {
  return (control: AbstractControl) => {
    const value = control.value;
    console.log(value)
    const converted = value.split(' ').join('-');

    if (value !== null && value !== "" && value !== undefined) {
      return afs
        .collection(collection, ref => ref.where(field, "==", converted))
        .valueChanges()
        .pipe(
          debounceTime(300),
          take(1),
          map(arr => {
            const val = arr.length == 1 ? { nameAvailable: true } : null;
            return val;
          })
        );
    }
  };
}

// export function checkPeroid() {
//   return (control: AbstractControl) => {
//     const value = control.value;
//     if (value !== null && value !== "" && value !== undefined) {
//       return afs
//         .collection(collection, ref => ref.where(field, "==", value))
//         .valueChanges()
//         .pipe(
//           debounceTime(300),
//           take(1),
//           map(arr => {
//             const val = arr.length == 1 ? { nameAvailable: true } : null;
//             return val;
//           })
//         );
//     }
//   };
// }
