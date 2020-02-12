import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphaPoint'
})
export class AlphaPointPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
