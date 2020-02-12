import { ConvertService } from 'src/app/services/convert.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateResolveDate'
})
export class DateResolveDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const date=ConvertService.toDate(value)
    return ConvertService.toCalendar(date);
  }

}
