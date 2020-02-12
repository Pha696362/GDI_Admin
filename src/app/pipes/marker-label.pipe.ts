import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markerLabel'
})
export class MarkerLabelPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value){
      const labelOptions = {
        color: '#111',
        fontFamily: '',
        fontSize: '14px',
        fontWeight: 'bold',
        text: value.toString(),
        }
        return labelOptions;
    }
    return {
      color: '#111',
      fontFamily: '',
      fontSize: '14px',
      fontWeight: 'bold',
      text: "",
      };
  }

}
