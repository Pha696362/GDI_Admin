import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'majorBag'
})
export class MajorBagPipe implements PipeTransform {

  transform(value: any, args?: any,statistic?:Array<any>): any {
    const items=statistic.filter(m=>m.key===args);
    if(items.length>0){
      const {total_approval,total_request}=items[0];
      return total_request-total_approval;
    }
    return 0;
  }

}
