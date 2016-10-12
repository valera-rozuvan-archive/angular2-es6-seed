import 'reflect-metadata';
import 'zone.js/dist/zone';

import { InitCapsPipe } from 'utils/init-caps-pipe.js';

describe('InitCapsPipe', () => {
  let pipe = InitCapsPipe;

  beforeEach(() => {
    pipe = new InitCapsPipe();
  });

  it('transforms "abc" to "Abc"', () => {
    expect(pipe.transform('abc')).toEqual('Abc');
  });

  it('transforms "abc def" to "Abc Def"', () => {
    expect(pipe.transform('abc def')).toEqual('Abc Def');
  });

  it('leaves "Abc Def" unchanged', () => {
    expect(pipe.transform('Abc Def')).toEqual('Abc Def');
  });
});

describe('InitCapsPipe non constructor invocation', () => {
  it('fails when InitCapsPipe is called as a function', () => {
    expect(function () {
      InitCapsPipe();
    }).toThrow(new Error('Cannot call a class as a function'));
  });
});
