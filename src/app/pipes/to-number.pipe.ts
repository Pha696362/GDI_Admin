import { ConvertService } from 'src/app/services/convert.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toNumber'
})
export class ToNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return ConvertService.toNumber(value);
  }

}
