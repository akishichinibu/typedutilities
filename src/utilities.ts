import {
  IfReadonly,
  IfFunction,
  IfRequired,
  IfFalseOrNerver,
  IfTrueOrNerver,
  IfNotExtendThenOr,
  IfExtendThenOr,
} from './if';
import { SArray, UnionType } from './structure/array';

export type StringKeyof<T> = keyof T & string;

export type StringValueof<T> = T[StringKeyof<T>];

export type PickRequired<T> = {
  [TKey in StringKeyof<T> as IfTrueOrNerver<IfRequired<T, TKey>, TKey>]: T[TKey];
};

export type PickOptional<T> = {
  [TKey in StringKeyof<T> as IfFalseOrNerver<IfRequired<T, TKey>, TKey>]?: T[TKey] | undefined;
};

export type PickReadonly<T> = {
  [TKey in StringKeyof<T> as IfTrueOrNerver<IfReadonly<T, TKey>, TKey>]: T[TKey];
};

export type PickWritable<T> = {
  [TKey in StringKeyof<T> as IfFalseOrNerver<IfReadonly<T, TKey>, TKey>]: T[TKey];
};

export type PickCallable<T> = {
  [TKey in StringKeyof<T> as IfTrueOrNerver<IfFunction<T[TKey]>, TKey>]: T[TKey];
};

export type PickNotCallable<T> = {
  [TKey in StringKeyof<T> as IfFalseOrNerver<IfFunction<T[TKey]>, TKey>]: T[TKey];
};

export type CallablePropertyNames<T> = keyof PickCallable<T>;

export type NotCallablePropertyNames<T> = keyof PickNotCallable<T>;

export type PickExclusively<TRecord, TTargetKey extends [string]> = {
  [TKey in keyof TRecord as IfNotExtendThenOr<TKey, TTargetKey[0], TKey, never>]?: undefined;
} & {
  [TKey in keyof TRecord as IfExtendThenOr<TKey, TTargetKey[0], TKey, never>]: TRecord[TTargetKey[0] & keyof TRecord];
};

export type ExclusiveRecord<TKeys, TValue> = TKeys extends string[] ? ExclusiveRecordImpl<TKeys, TKeys, TValue> : never;

type ExclusiveValue<TAllKeys, TTargetKey extends string, TValue> = {
  [TKey in UnionType<TAllKeys> as IfNotExtendThenOr<TKey, TTargetKey, TKey & string, never>]?: undefined;
} & {
  [TKey in UnionType<TAllKeys> as IfExtendThenOr<TKey, TTargetKey, TKey, never>]: TValue;
};

type ExclusiveRecordImpl<TKeys, TRestKeys, TValue> = TKeys extends []
  ? never
  : TRestKeys extends SArray<string, infer Head, infer Tail>
  ? ExclusiveValue<TKeys, Head, TValue> | ExclusiveRecordImpl<TKeys, Tail, TValue>
  : never;
