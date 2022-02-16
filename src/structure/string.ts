import { IsEmpty, SArray } from './array';
import { IfTrueThenOr } from 'src/if';

export type EmptyString = '';

type JoinImpl<TDelimiter extends string, TElements extends string[], TResult extends string> = TElements extends []
  ? TResult
  : TElements extends SArray<string, infer Head, []>
  ? `${Head}`
  : TElements extends SArray<string, infer Head, infer Tail>
  ? `${Head}${TDelimiter}${JoinImpl<TDelimiter, Tail, TResult>}`
  : never;

type String1<T extends string> = T extends `${T[0]}${infer TRest}` ? (TRest extends EmptyString ? T : never) : never;

/**
 * A type to join a string array with the given delimeter
 *
 * @param TDelimiter
 * @param TElements - a string array
 * @returns the string join by the given delimeter
 *
 * @example
 *
 * ```ts
 * type X = Join<"#", ["a", "b", "c"]> // X is "a#b#c";
 * type Y = Join<"#", []> // Y is "";
 * type Z = Join<"#", ["a"]> // Z is "a";
 * ```
 */
export type Join<TDelimiter extends string, TElements extends string[]> = JoinImpl<TDelimiter, TElements, EmptyString>;

/**
 * A type to concatenate a string array
 * It's a alise of Join<"", TElement>
 *
 * @param TElements - a string array
 * @returns the concatenated string
 *
 * @example
 *
 * ```ts
 * type X = Concat<["a", "b", "c"]> // X is "abc";
 * ```
 */
export type Concat<TElements extends string[]> = Join<EmptyString, TElements>;

export type Split<TDelimiter extends string, TTarget extends string> = SplitImpl<TDelimiter, TTarget>;

type SplitImpl<
  TDelimiter extends string,
  TTarget extends string,
  TResult extends string[] = [],
  TBuffer extends string[] = [],
  > = TTarget extends EmptyString
  ? IfTrueThenOr<IsEmpty<TBuffer>, TResult, [...TResult, Concat<TBuffer>]>
  : TTarget extends `${TDelimiter}${infer TRest}`
  ? SplitImpl<TDelimiter, TRest, [...TResult, Concat<TBuffer>], []>
  : TTarget extends `${String1<infer THead>}${infer TRest}`
  ? SplitImpl<TDelimiter, TRest, TResult, [...TBuffer, THead]>
  : never;
