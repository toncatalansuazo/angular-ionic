import { Pipe, PipeTransform } from '@angular/core';
import { Pivot } from 'src/app/core/http/product/product.model';

@Pipe({
  name: 'pivotFormat'
})
export class PivotPipe implements PipeTransform {

  transform(value: Pivot): string {
    if (Boolean(value && value.unit && value.quantity)) {
      const units: RegExpMatchArray | null = value.unit.match(/[^0-9]+/);
      const unit: string = (units && units[0]) || 'unit not found/ '; 
      const digits: RegExpMatchArray | null = value.unit.match(/\d+/);
      const quantity: number| null = (digits && (parseInt(digits[0], 10) * value.quantity));
      return quantity + unit;
    }
    return '';
  }

}
