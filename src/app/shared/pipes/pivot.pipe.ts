import { Pipe, PipeTransform } from '@angular/core';
import { Pivot } from 'src/app/core/http/product/product.model';

@Pipe({
  name: 'pivotFormat'
})
export class PivotPipe implements PipeTransform {

  transform(value: Pivot): any {
    if (value) {
      return (value.quantity * parseInt(value.unit.match(/\d+/)[0], 10)) + value.unit.match(/[^0-9]+/)[0];
    }
    return '';
  }

}
