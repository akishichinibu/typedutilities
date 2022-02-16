import { SArray } from './array';
import { Split } from './string';
import { StringKeyof, StringValueof } from '../utilities';

/**
 * A type to pick the type of a member by a path string
 *
 * @param TTarget - the target type
 * @param TPathString - the path string
 * @returns the type of the member specified by path string. If not exist, return never
 *
 * @example
 *
 * ```ts
 * class A {
 *   a!: string;
 *   b!: B;
 * }
 *
 * class B {
 *   x!: string;
 *   y!: boolean;
 * }
 *
 * type X1 = PickByPath<A, "a">; // X1 is string
 * type X2 = PickByPath<A, "b.y">; // X2 is boolean
 * ```
 */
export type PickByPath<TTarget, TPathString extends string> = PickByPathImpl<TTarget, Split<'.', TPathString>>;

type PickByPathImpl<TTarget, TPath extends string[]> = TPath extends SArray<string, infer Head, []>
  ? TTarget[Head & keyof TTarget]
  : TPath extends SArray<string, infer Head, infer TTail>
  ? PickByPathImpl<TTarget[Head & keyof TTarget] & keyof TPath, TTail>
  : never;

type MarkMapPath<TTarget, TPrefix extends string> = TTarget extends number
  ? TPrefix
  : TTarget extends string
  ? TPrefix
  : TTarget extends boolean
  ? TPrefix
  : {
      [TKey in StringKeyof<TTarget>]: TKey extends string ? MarkMapPath<TTarget[TKey], `${TPrefix}:${TKey}`> : never;
    };

type RecursiveUnionValue<TTarget> = StringValueof<{
  [TKey in StringKeyof<TTarget>]: TTarget[TKey] extends string ? TTarget[TKey] : RecursiveUnionValue<TTarget[TKey]>;
}>;

/**
 * A type to generate all possible paths for TTarget as an string union type
 *
 * @param TTarget - the target type
 * @returns a string union type contains all all possible path string
 *
 * @example
 *
 * ```ts
 * class A {
 *   a!: string;
 *   b!: B;
 * }
 *
 * class B {
 *   x!: string;
 *   y!: boolean;
 * }
 *
 * type X = MapPathUnion<A>;
 * const s1: X = ":a";
 * const s2: X = ":b:x";
 * const s3: X = ":b:z"; // error here
 * ```
 */
export type MapPathUnion<TTarget> = RecursiveUnionValue<MarkMapPath<TTarget, ''>>;
