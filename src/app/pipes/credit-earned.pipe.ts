import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditEarned'
})
export class CreditEarnedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value){
      switch (args) {
        case 'IP':
        case 'I':
        case 'W':
        case 'F':
        case 'WF':
          return 0
        default:
          return value
      }
    }
    return 0;
  }

}
