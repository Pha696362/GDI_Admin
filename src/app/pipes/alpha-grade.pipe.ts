import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphaGrade'
})
export class AlphaGradePipe implements PipeTransform {

  transform(value: any, args?:Array<any>): any {
    if(args) return null;
    return null;
  }

}
