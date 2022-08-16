import { AnyApi, MethodOf } from "./types/aspida";
import { OrFalsy } from "./types/utils";

type Keys<
  M,
  Extra extends readonly unknown[],
  Params extends readonly unknown[]
> = [path: string, method: M, ...extra: Extra, ...params: Params];

/**
 */
export const aspidaToSWR = <
  T extends AnyApi,
  M extends MethodOf<T>,
  Extra extends readonly unknown[]
>(
  api: OrFalsy<T>,
  method: M,
  extra: OrFalsy<Extra>
) => ({
  params: <Params extends readonly unknown[]>(
    fetchFn: (fn: T[M], ...rest: [...Extra, ...Params]) => ReturnType<T[M]>
  ): [
    getKey: (...params: Params) => Keys<M, Extra, Params> | null,
    fetcher: (...args: Keys<M, Extra, Params>) => ReturnType<typeof fetchFn>
  ] => [
    // getKey:
    (...params) => {
      return !!api && !!extra
        ? [api.$path(), method, ...extra, ...params]
        : null;
    },
    // fetcher:
    (_path, method, ...rest) => {
      if (!!api && !!rest) return fetchFn(api![method], ...rest);
      throw new Error("Unreachable Code");
    },
  ],
});
