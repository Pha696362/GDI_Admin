import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'dateSmall'
})
export class DaysSmallPipe implements PipeTransform {

  
  transform(value: Date, args?: any): any {
    return moment(value).format('d/MM/YYYY');
  }

}
