import { SArray, SArrayFix } from './array';
import { IfExtends, IfGreater } from 'src/if';

export type Not<T extends boolean> = IfExtends<T, false>;

export type And<A extends boolean, B extends boolean> = A extends true ? (B extends true ? true : false) : false;

export type Or<A extends boolean, B extends boolean> = A extends false ? (B extends false ? false : true) : true;

export type Xor<A extends boolean, B extends boolean> = A extends B ? (B extends A ? true : false) : false;

export type Add<A extends number, B extends number> = A extends 0
  ? B
  : B extends 0
  ? A
  : [...SArrayFix<number, A>, ...SArrayFix<number, B>]['length'] & number;

export type Sub<A extends number, B extends number> = B extends 0
  ? A
  : (SArrayFix<number, A> extends [...First: SArrayFix<number, B>, ...rest: infer R] ? R['length'] : never) & number;
