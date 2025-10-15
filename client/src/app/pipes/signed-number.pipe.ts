// signed-number.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'signedNumber',
})
export class SignedNumberPipe implements PipeTransform {
  transform(value: number | string | null): string {
    if (value === null) {return '';}
    const result = typeof value === 'number' ? value : parseFloat(value);
    return result >= 0 ? `+${result}` : result.toString();
  }
}