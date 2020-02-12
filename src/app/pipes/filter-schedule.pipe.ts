import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSchedule'
})
export class FilterSchedulePipe implements PipeTransform {

  transform(item: Array<any>, args?: any): any {
    if(!item) return null;
    return item.filter(m=>m.term.key===args);
  }
}
