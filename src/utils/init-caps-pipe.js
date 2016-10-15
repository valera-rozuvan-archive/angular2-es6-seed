import {Pipe} from '@angular/core';

class InitCapsPipe {
  transform(value) {
    return value.toLowerCase().replace(
      /(?:^|\s)[a-z]/g, m => m.toUpperCase()
    );
  }
}

InitCapsPipe.annotations = [
  new Pipe({
    name: 'initCaps'
  })
];

export {InitCapsPipe};
