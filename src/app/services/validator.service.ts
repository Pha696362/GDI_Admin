import { Injectable } from '@angular/core';
import { map, take, debounceTime } from 'rxjs/operators';
import { Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()

export class FireValidatorService {

    static ConfirmPassword(control: AbstractControl): ValidationErrors {
      console.log(control)
      return null;
    }

    static checkExist2condistion(afs: AngularFirestore, collection: string, feild1: string, feild2: string, cid: any) {
        return (control: AbstractControl) => {
            const value = control.value;
            if (value !== null && value !== '' && value !== undefined) {

                return afs.collection(collection, ref => ref.where(feild1, '==', cid).where(feild2, '==', value))
                    .valueChanges().pipe(
                        debounceTime(300),
                        take(1),
                        map(arr => {
                            const val = arr.length == 1 ? { nameAvailable: true } : null
                            return val;
                        }),
                )
            }
        }
    }

    static customEmailValidator(control: AbstractControl): ValidationErrors {
        if (!control.value) {
            return null;
        }
        return Validators.email(control);
    }

    static checkExist(afs: AngularFirestore, collection: string, feild: string) {
        return (control: AbstractControl) => {
            const value = control.value;
            if (value !== null && value !== '' && value !== undefined) {
                return afs.collection(collection, ref => ref.where(feild, '==', value))
                    .valueChanges().pipe(
                        debounceTime(300),
                        take(1),
                        map(arr => {
                            const val = arr.length == 1 ? { nameAvailable: true } : null
                            return val;
                        }),
                )
            }
        }
    }

    static isObjEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    }

    static checkExistOnEdit(afs: AngularFirestore, collection: string, field: string, old: any) {
        return (control: AbstractControl) => {
            const value = control.value;
            if (value !== null && value !== '' && value !== undefined) return { invalid: true }
            if (value != old.name) {
                return afs.collection(collection, ref => ref.where(field, '==', value).limit(1))
                    .valueChanges().pipe(
                        debounceTime(300),
                        take(1),
                        map(arr => {
                            const val = arr.length == 1 ? { nameAvailable: true } : null
                            return val;
                        }),
                )
            }
        }
    }
    public static strong(control: AbstractControl) {
        let hasNumber = /\d/.test(control.value);
        let hasUpper = /[A-Z]/.test(control.value);
        let hasLower = /[a-z]/.test(control.value);
        const valid = hasNumber && hasUpper && hasLower;
        if (!valid) {
            // return what´s not valid
            return { strong: true };
        }
        return null;
    }

}
