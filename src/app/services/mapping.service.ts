import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { firestore } from 'firebase';
import { ConvertService } from './convert.service';
import { AbstractControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor() { }

  static filter(data: Array<any>, field: string, keyword: string) {
    return _.filter(data, [field, keyword])
  }

  static sumCreditAttempted(data: Array<any>) {
    return data.reduce((acc, cur) => acc + Number(cur.credits_attempted), 0)
  }

  static sumCreditCalculator(data: Array<any>) {
    return data.reduce((acc, cur) => acc + Number(cur.credits_calculator), 0)
  }

  static sumTotalPoint(data: Array<any>) {
    return data.reduce((acc, cur) => acc + cur.total, 0)
  }

  static sumCreditEarned(data: Array<any>) {
    return data.reduce((acc, cur) => acc + cur.credits_earned, 0)
  }

  static pushToArrayWithId(data: firestore.QuerySnapshot) {
    const result: any = data.docs.map(m => { return { ...m.data(), docId: m.id } })
    return result;
  }

  static orderBy(data: Array<any>, field: string) {
    return _.orderBy(data, [field])
  }
  static orderByDesc(data: Array<any>, field: string) {
    return _.orderBy(data, [field], ['desc'])
  }

  static uniqOnTop(data: Array<any>, field: string, filedOrderBy: string) {
    const rows = _.orderBy(data, [filedOrderBy], ['desc'])
    return _.uniqBy(rows, field)
  }

  static groupBy(data: Array<any>, field: string, filedOrderBy: string) {
    const rows = _.uniqBy(data, field)
    return _.orderBy(rows, [filedOrderBy])
  }

  static groupByDesc(data: Array<any>, field: string, filedOrderBy: string) {
    const rows = _.uniqBy(data, field)
    return _.orderBy(rows, [filedOrderBy], ['desc'])
  }

  static toParaKey(name: string) {
    return name.toLowerCase().replace(" ", "_");
  }

  static pushToArray(data: firestore.QuerySnapshot) {
    if (data.empty) return null;
    return data.docs.map(m => { return { ...m.data() } })
  }

  static pushToObject(data: firestore.DocumentSnapshot) {
    if (!data.exists) return null;
    return data.data();
  }

  static genCrimeIndex(index: number) {
    let value = index.toString();
    if (value.length == 1) value = "00" + value;
    else if (value.length == 2) value = "0" + value;
    else if (value.length == 3) value = value;
    return value;
  }

  static toArray(value: any) {
    if (value === undefined || value === null) {
      return [];
    }
    return value;
  }

  static fieldArrayValues(data: any, item: any) {
    const row = item.key;
    if (this.toArray(data).length === 0) {
      return [row];
    }
    else {
      const list = data.filter((m: any) => m === item.key);
      if (list.length === 0) {
        return data.push(row);
      }
      else {
        return data.filter((m: any) => m !== item.key);
      }
    }
  }

  static updatedArrayItem(data: Array<any>, newItem) {
    const exist = data.filter(m => m.key === newItem.key);
    if (exist && exist.length > 0) {
      const index = data.findIndex((obj => obj.key == newItem.key));
      data[index] = newItem;
    } else {
      data.push(newItem);
    }
    return data;
  }

  static calAge(dob: Date) {
    let age = null;
    const year = ConvertService.yearNumberKey(new Date()) - ConvertService.yearNumberKey(dob);
    const month = ConvertService.monthNumberKey(dob) - ConvertService.monthNumberKey(new Date());
    if (month >= 0) {
      age = year
    } else {
      age = year - 1;
    }
    return age;
  }

  static calScholarship(amount, arg: any): any {
    let value = 0;
    let { percentage, cash, loan } = arg;
    const cashAmount = ConvertService.toNumber(cash);
    const percentAmount = ConvertService.toNumber(percentage);
    const loanAmount = ConvertService.toNumber(loan);
    let deduction = (percentAmount + loanAmount) >= 100 ? 0 : 10;
    let balanceDue = amount - deduction;
    let totalScholarship = 0;
    let totalLoan = 0;
    if (cashAmount !== 0) {
      balanceDue = balanceDue - cashAmount;
      totalScholarship = totalScholarship + cashAmount;
    }
    if (percentAmount !== 0) {
      const totalDisP = balanceDue * percentAmount / 100;
      balanceDue = balanceDue - totalDisP;
      totalScholarship = totalScholarship + totalDisP;
    }
    if (loanAmount !== 0) {
      totalLoan = balanceDue * loanAmount / 100;
      balanceDue = balanceDue - totalLoan;
    }
    value = balanceDue + deduction;
    const result = {
      totalLoan: totalLoan,
      totalScholarship: totalScholarship,
      balanceDue: value,
      deductAmount: deduction
    }
    return result;
  }

  static testingTab(tabs: Array<any>, key: string, iKey: string) {
    const tab = [];
    let i = 0;
    tabs.forEach(m => {
      tab.push({
        path: m.path + "/" + key + "/" + iKey + "/" + m.key,
        label: m.label
      });
      i++;
    });
    return tab;
  }

  static autoComplete(stateCtrl: AbstractControl, data: any, type) {
    return stateCtrl.valueChanges.pipe(startWith(''),
      map(state => state ? this.filterStates(data, stateCtrl.value, type) : data.slice())
    );
  }

  static filterStates(data: any, value: any, type: any): any[] {
    if (value.key || value.id || !data) return;
    switch (type) {
      case "code":
        return data.filter(state => state.code.toLowerCase().indexOf(value.toLowerCase()) > -1);
      case "name":
        return data.filter(state => state.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
      case "subject.name":
        return data.filter(state => state.subject.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
      case "full_name":
        return data.filter(state => state.full_name.toLowerCase().indexOf(value.toLowerCase()) > -1);
      case "displayName":
        return data.filter(state => state.displayName.toLowerCase().indexOf(value.toLowerCase()) > -1);
      case "crime_no":
        return data.filter(state => state.crime_no.toLowerCase().indexOf(value.toLowerCase()) > -1);
      default:
        break;
    }
  }

  public static validSelected(control: AbstractControl): { [s: string]: boolean } {
    const value = control.value;
    if (value !== undefined && value !== null && value !== '') {
      if (!value.key && !value.id) {
        return { validKey: true }
      }
    }
  }

  public static toNull(value) {
    if (value === "" || value === undefined || value === null) {
      return null;
    }
    return value;
  }


  static userObj(item: any) {
    const obj = this.toNull(item)
    if (obj) {
      return {
        key: item.key,
        displayName: this.toNull(item.displayName),
        email: this.toNull(item.email),
        role: this.toNull(item.role),
      };
    } else return null;
  }

  static provinceObj(item: any) {
    const obj = this.toNull(item)
    if (obj) {
      return {
        key: item.key,
        name: this.toNull(item.name),
        code: this.toNull(item.code),
      };
    } else return null;
  }


  static districtObj(item: any) {
    const obj = this.toNull(item)
    if (obj) {
      return {
        key: item.key,
        name: this.toNull(item.name),
        code: this.toNull(item.code),
      };
    } else return null;
  }

  static communeObj(item: any) {
    const obj = this.toNull(item)
    if (obj) {
      return {
        key: item.key,
        name: this.toNull(item.name),
        code: this.toNull(item.code),
      };
    } else return null;
  }

  static subCategoryObj(item: any) {
    const obj = this.toNull(item)
    if (obj) {
      return {
        key: item.key,
        name: this.toNull(item.name),
      };
    } else return null;
  }


}
