import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'dateMedium'
})
export class DateMediumPipe implements PipeTransform {

  transform(value: Date, args?: any): any {
    return moment(value).format('D MMM YYYY');
  }

}
