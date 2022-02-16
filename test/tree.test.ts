import { Assert, AssertFailed, IfEquals, Test, TestFailed } from 'src/if';
import { MapPathUnion, PickByPath } from 'src/structure/tree';

class C {
  p!: string;
  q!: number;
}

class B {
  l1!: string;

  l2!: number;

  l3!: boolean;

  l4!: C;
}

class A {
  x!: B;

  y!: number;

  z!: string;
}

it('test path pickup', () => {
  type _1 = Assert<
    [
      Test<A['y'], PickByPath<A, 'y'>>,
      Test<A['x']['l1'], PickByPath<A, 'x.l1'>>,
      Test<A['x']['l4']['p'], PickByPath<A, 'x.l1'>>,
      Test<A['x']['l4']['p'], PickByPath<A, 'x.l4.p'>>,
    ]
  >;

  type X = MapPathUnion<A>;

  const s1: X = ':x:l1';
  const s2: X = ':x:l4:p';

  // @ts-expect-error
  const s3: X = ':x:l5:p';
});
