import { libException } from './lib-exception';

describe('libException', () => {
  it('should work', () => {
    expect(libException()).toEqual('lib-exception');
  });
});
