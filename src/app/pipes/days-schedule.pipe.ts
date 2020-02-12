import { Pipe, PipeTransform } from '@angular/core';
import { ConvertService } from '../services/convert.service';

@Pipe({
  name: 'daysSchedule'
})
export class DaysSchedulePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return null;
    return ConvertService.getDaySchedule(value);
  }

}
