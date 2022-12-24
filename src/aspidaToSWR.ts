import { AnyApi, MethodOf } from "./types/aspida";
import { OrFalsy } from "./types/utils";

type Keys<M, Extra extends {}, Params extends readonly unknown[]> = {
  path: string;
  method: M;
  extra: Extra;
  params: Params;
};

/**
 */
export const aspidaToSWR = <
  T extends AnyApi,
  M extends MethodOf<T>,
  Extra extends {},
  Params extends readonly unknown[] = []
>(
  api: OrFalsy<T>,
  method: M,
  extra: OrFalsy<Extra>,
  fetchFn: (fn: T[M], extra: Extra, ...rest: [...Params]) => ReturnType<T[M]>
): [
  getKey: (...params: Params) => Keys<M, Extra, Params> | null,
  fetcher: (key: Keys<M, Extra, Params>) => ReturnType<typeof fetchFn>
] => [
  // getKey:
  (...params) => {
    return !!api && !!extra
      ? { path: api.$path(), method, extra, params }
      : null;
  },
  // fetcher:
  ({ method, extra, params }) => {
    console.log({ params });
    if (!!api && !!extra) return fetchFn(api![method], extra, ...params);
    throw new Error("Unreachable Code");
  },
];
