import { PickRequired, PickOptional, PickReadonly, PickCallable } from 'src/utilities';

export type Callable<TArgs = any, TReturn = any> = (...args: TArgs[]) => TReturn;

export type Constructor<T> = { new (...args: any[]): T };

export type IsomorphismInterface<TTarget> = Omit<
  PickRequired<TTarget> & PickOptional<TTarget>,
  keyof (PickReadonly<TTarget> | PickCallable<TTarget>)
>;
