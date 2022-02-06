import { Sub } from './structure/operator';
import { Callable } from './structure/interface';

export type IfFunction<TTarget> = TTarget extends Callable ? true : false;

export type IfIterable<TTarget> = TTarget extends Iterable<any> ? true : false;

export type IfExtends<TFrom, TTo> = TFrom extends never ? true : TFrom extends TTo ? true : false;

export type IfExtendThenOr<TFrom, TTo, TThen, TOr> = TFrom extends TTo ? TThen : TOr;

export type IfNotExtendThenOr<TFrom, TTo, TThen, TOr> = TFrom extends TTo ? TOr : TThen;

export type IfTrueThenOr<TFrom, TThen, TOr> = IfExtendThenOr<TFrom, true, TThen, TOr>;

export type IfTrueOrNerver<TCondition, TReturn> = IfExtendThenOr<TCondition, true, TReturn, never>;

export type IfFalseOrNerver<TCondition, TReturn> = IfExtendThenOr<TCondition, false, TReturn, never>;

export type IfEquals<T, U, Y = T, N = never> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2
  ? Y
  : N;

export type IfGreater<A extends number, B extends number> = Sub<B, A> extends never ? true : false;

export type IfLess<A extends number, B extends number> = Sub<A, B> extends never ? true : false;

export type IfReadonly<TTarget, TKey extends keyof TTarget> = IfExtends<
  Pick<TTarget, TKey>,
  Readonly<Pick<TTarget, TKey>>
>;

export type IfRequired<TTarget, Tkey extends keyof TTarget> = IfExtends<
  Pick<TTarget, Tkey>,
  Required<Pick<TTarget, Tkey>>
>;

export type Assert<T extends true[]> = T;

export type Test<T, Q> = IfEquals<T, Q, true, false>;

export type TestFailed<T, Q> = IfEquals<T, Q, false, true>;

export type AssertFailed<T extends false[]> = T;
