import { AnyApi, MethodOf } from "./types/aspida";
import { OrFalsy } from "./types/utils";

type Keys<
  M,
  Eager extends readonly unknown[],
  Lazy extends readonly unknown[]
> = [path: string, method: M, ...eager: Eager, ...lazy: Lazy];

/**
 */
export const resolveAspida = <
  T extends AnyApi,
  M extends MethodOf<T>,
  Eager extends readonly unknown[]
>(
  api: OrFalsy<T>,
  method: M,
  eager: OrFalsy<Eager>
) => ({
  withParams: <Lazy extends readonly unknown[]>(
    fetchFn: (fn: T[M], ...extra: [...Eager, ...Lazy]) => ReturnType<T[M]>
  ): [
    getKey: (...lazy: Lazy) => Keys<M, Eager, Lazy> | null,
    fetcher: (...args: Keys<M, Eager, Lazy>) => ReturnType<typeof fetchFn>
  ] => [
    // getKey:
    (...lazy) => {
      return !!api && !!eager ? [api.$path(), method, ...eager, ...lazy] : null;
    },
    // fetcher:
    (_path, method, ...extra) => {
      if (!!api && !!eager) return fetchFn(api![method], ...extra);
      throw new Error("Unreachable Code");
    },
  ],
});
