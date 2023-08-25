import * as vkbeautify from 'vkbeautify';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'json',
})
export class TransformPipe implements PipeTransform {
  transform(value: string, type: string): string {
    if (type === 'xml') {
      return vkbeautify.xml(value);
    } else if (type === 'json') {
      return vkbeautify.json(value);
    } else {
      return value;
    }
  }
}
