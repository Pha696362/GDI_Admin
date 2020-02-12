import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupByProgram'
})
export class GroupByProgramPipe implements PipeTransform {

  transform(items:any, program?: any): any {
    return items.filter(item => item.program.key===program);
  }

}
