// number-compressor.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'numberCompressor',
})
export class NumberCompressorPipe implements PipeTransform {
  transform(value: number): string {
    const units: [number, string][] = [
        [1000000, 'M'],
        [1000, 'K'],
        [1, '']
    ];
    const unit = units.find(unit => value >= unit[0]) || units[units.length - 1];
    return (value / unit[0]).toFixed(1) + unit[1];
  }
}