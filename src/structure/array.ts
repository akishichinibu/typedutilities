import { IfEquals, IfTrueThenOr } from 'src/if';
import { Add, Sub } from './operator';

export type SArray<T, THead extends T, TTail extends T[]> = [THead, ...TTail];

export type SArrayFix<T, TLength extends number> = SArrayFixImpl<T, TLength, []>;

type SArrayFixImpl<T, TLength extends number, TResult extends T[]> = TResult['length'] extends TLength
  ? TResult
  : SArrayFixImpl<T, TLength, [T, ...TResult]>;

export type UnionType<TKeys> = TKeys extends []
  ? never
  : TKeys extends SArray<string, infer THead, infer TTail>
  ? THead | UnionType<TTail>
  : never;

export type Contains<T, TElement, TContainer extends T[]> = ContainsImpl<T, TElement, TContainer>;

type ContainsImpl<T, TElement, TContainer extends T[], TIndex extends number = 0> = TElement extends T
  ? TContainer extends SArray<T, infer THead, infer TTail>
    ? IfTrueThenOr<IfEquals<THead, TElement>, TIndex, ContainsImpl<T, TElement, TTail, Add<TIndex, 1>>>
    : never
  : never;

export type Length<TContainer extends any[]> = LengthImpl<TContainer, 0>;

type LengthImpl<TContainer extends any[], TResult extends number = 0> = TContainer extends []
  ? TResult
  : TContainer extends SArray<any, infer Head, infer Tail>
  ? LengthImpl<Tail, Add<TResult, 1>>
  : never;

export type IsEmpty<TContainer extends any[]> = IfEquals<Length<TContainer>, 0, true, false>;

export type Repeat<TElement, TTimes extends number> = TTimes extends 1
  ? [TElement]
  : [TElement, ...Repeat<TElement, Sub<TTimes, 1>>];

type X = Repeat<1, 3>;