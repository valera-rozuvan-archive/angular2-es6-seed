import {Pipe} from '@angular/core';

@Pipe({name: 'initCaps'})
export class InitCapsPipe {
  transform(value) {
    return value.toLowerCase().replace(/(?:^|\s)[a-z]/g, function(m) {
      return m.toUpperCase();
    });
  }
}
