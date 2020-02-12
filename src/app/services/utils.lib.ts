import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as moment from 'moment';
import { firestore } from 'firebase';

@Injectable()
export class FireStoreService {

    newCollection: AngularFirestoreCollection<any[]>;
    db: any;
    constructor(private AFS: AngularFirestore) {
        this.db = this.AFS.firestore;
    }

    getFromDateToDate(key) {
        var objDate = {
            fromDate: '',
            toDate: ''
        }
        if (key == true) {

            objDate.fromDate = this.covertDatetoString(key.fromDate, 'YYYYMMDD') + '000000';
            objDate.toDate = this.covertDatetoString(key.toDate, 'YYYYMMDDHHmmss');
        } else
            if (key == 'lastmonth') {

                objDate.fromDate = moment().subtract(1, 'months').startOf('month').format('YYYYMMDDHHmmss');
                objDate.toDate = moment().subtract(1, 'months').endOf('month').format('YYYYMMDDHHmmss');
            } else {

                objDate.fromDate = moment().startOf(key).format('YYYYMMDDHHmmss');
                objDate.toDate = moment().endOf(key).format('YYYYMMDDHHmmss');
            }
        return objDate;
    }

    filterArrayByObj(datas, value) {
        return datas.filter(data => data.id === value);
    }

    covertDatetoString(value, format) {
        return moment(value).format(format);
    }

    covertDatetoNumber(value, format) {
        return Number(moment(value).format(format));
    }

    coverStringtoDate(value, format) {
        return moment(value, format).toDate();
    }

    isObjEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    }

    getDocId() {
        return this.AFS.createId();
    }

    getDocData(collectionName: string = '', docId: any = '') {
        return this.AFS.collection(collectionName).doc(docId).valueChanges();
    }

    getData(collectionName: string = '', condition: any = {}) {
        this.newCollection = this.AFS.collection(
            collectionName, ref => {
                let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
                if (!this.isObjEmpty(condition)) {
                    if (condition.where) {
                        for (var i = 0; i < condition.where.length; i++) {
                            { query = query.where(condition.where[i].field, condition.where[i].operator, condition.where[i].value) }
                        }
                    }
                    if (condition.orderBy) { query = query.orderBy(condition.orderBy.field, condition.orderBy.value) }
                    if (condition.limit) { query = query.limit(condition.limit) }
                }
                return query;
            }
        )
        return this.newCollection.valueChanges();
    }

    setData(collectionName: string = '', docId: any = '', value: any = {}) {
        return this.AFS.collection(collectionName).doc(docId).set(value);
    }

    updateData(collectionName: string = '', docId: any = '', value: any = {}) {
        return this.AFS.collection(collectionName).doc(docId).update(value);
    }

    deleteData(collectionName: string = '', docId: any = '') {
        return this.AFS.collection(collectionName).doc(docId).delete();
    }

    multiTransaction(data) {
        var batch = this.db.batch();
        var nameRef: any;
        for (var i = 0; i < data.length; i++) {
            if (data[i].method == 'set') {
                nameRef = data[i].collectionName + data[i].docId;
                nameRef = this.db.collection(data[i].collectionName).doc(data[i].docId);
                batch.set(nameRef, data[i].value);
            } else if (data[i].method == 'update') {
                nameRef = data[i].collectionName + data[i].docId;
                nameRef = this.db.collection(data[i].collectionName).doc(data[i].docId);
                batch.update(nameRef, data[i].value);
            } else if (data[i].method == 'delete') {
                nameRef = data[i].collectionName + data[i].docId;
                nameRef = this.db.collection(data[i].collectionName).doc(data[i].docId);
                batch.delete(nameRef);
            }
        }
        return batch.commit()
    }
}

@Injectable()
export class Utils {

    public static generate_instructor():string {
        var id =  moment().format('YYMMDD').toString() 
        return id.toString();
    }

    public static generate_studentId(config:any) {
        var id = Number(config.serial_number) + 1
        return id;
    }

    public static generate_testing_invoiceNo(config: any) {
        var number = Number(moment().format('YYMMDD').toString() + (config.invoice_shufit + 1));
        return number;
    }

    public static generate_puc_id(config: any) {
        var number = moment().format('YY').toString() + (config.puc_id + 1).toString();
        return number;
    }

    public static setLocalstorageItem(itemName: string, itemValue: any) {
        localStorage.setItem(itemName, JSON.stringify(itemValue));
    }

    public static getLocalstorageItem(itemKey: string): any {
        let value = localStorage.getItem(itemKey);
        if (this.IsJsonString(value)) {
            return JSON.parse(value)
        }
        return value;
    }

    public static IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

}
        

export function pushToArray(snapshot: firestore.QuerySnapshot) {
    if(snapshot.empty) return [];
    return snapshot.docs.map(m => ({ ...m.data(), id: m.id }));
  }
  
  export function pushToObject(snapshot: firestore.DocumentSnapshot){
    if(!snapshot.exists) return null;
    return {...snapshot.data(),id:snapshot.id}
  }