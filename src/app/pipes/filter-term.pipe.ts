import { MappingService } from './../services/mapping.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTerm'
})
export class FilterTermPipe implements PipeTransform {

  transform(item: Array<any>, args?: any): any {
    if(!item) return null;
    return MappingService.orderBy(item.filter(m=>m.term.key===args),"courseCode");
  }

}
