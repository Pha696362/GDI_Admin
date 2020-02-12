import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupByCourses'
})
export class GroupByCoursesPipe implements PipeTransform {

  transform(items:any, courseKey?: any): any {
    return items.filter(item => item.subject_type.key===courseKey);
  }

}
