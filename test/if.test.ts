import { Assert, AssertFailed, IfFunction, IfGreater } from 'src';

it('test IfFunction', () => {
  class TestClass {}

  function testFunction() {
    return 1;
  }

  type _1 = Assert<[IfFunction<() => void>, IfFunction<() => 1>, IfFunction<typeof testFunction>]>;

  type _2 = AssertFailed<[IfFunction<1>, IfFunction<'a'>, IfFunction<TestClass>]>;
});

it('test IfGreater/IfLess', () => {
  type _1 = Assert<[IfGreater<114, 1>, IfGreater<1, 0>]>;
});
