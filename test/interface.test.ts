import { ExclusiveRecord, PickExclusively } from 'src';

interface TestStruct {
  a: number;
  b?: boolean;
  c: string;
}

class TestClass {
  a!: number;
  b?: boolean;
  c!: string;

  get hello() {
    return '';
  }

  sayHello() {
    return '';
  }
}

it('test PickExclusively', () => {
  type TExclusiveA = PickExclusively<TestStruct, ['a']>;

  const _1: TExclusiveA = {
    a: 1,
    b: undefined,
    c: undefined,
  };

  const _2: TExclusiveA = {
    a: 1,
    // @ts-expect-error
    b: true,
    c: undefined,
  };
});

it('test ExclusiveRecord', () => {
  type R = ExclusiveRecord<['a', 'b', 'c'], boolean>;

  const _1: R = {
    a: true,
    b: undefined,
    c: undefined,
  };

  // @ts-expect-error
  const _2: R = {
    a: true,
    b: true,
    c: undefined,
  };
});
