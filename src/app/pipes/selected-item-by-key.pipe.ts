import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectedItemByKey'
})
export class SelectedItemByKeyPipe implements PipeTransform {

  transform(data: Array<any>, itemKey: string): any {
    if (data && data.length > 0) {
      const item = data.filter(m => m.key === itemKey);
      if (item && item.length > 0) return true;
      else return false;
    }
    return false;
  }

}
