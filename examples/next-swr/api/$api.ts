import type { AspidaClient } from "aspida";
import { dataToURLString } from "aspida";
import type { Methods as Methods0 } from "./hello";
import type { Methods as Methods1 } from "./users/_userId@number";
import type { Methods as Methods2 } from "./users/_userId@number/posts";

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? "" : baseURL).replace(/\/$/, "");
  const PATH0 = "/hello";
  const PATH1 = "/users";
  const PATH2 = "/posts";
  const GET = "GET";

  return {
    hello: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods0["get"]["resBody"]>(prefix, PATH0, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods0["get"]["resBody"]>(prefix, PATH0, GET, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
    users: {
      _userId: (val1: number) => {
        const prefix1 = `${PATH1}/${val1}`;

        return {
          posts: {
            get: (option: {
              query: Methods2["get"]["query"];
              config?: T | undefined;
            }) =>
              fetch<Methods2["get"]["resBody"]>(
                prefix,
                `${prefix1}${PATH2}`,
                GET,
                option
              ).json(),
            $get: (option: {
              query: Methods2["get"]["query"];
              config?: T | undefined;
            }) =>
              fetch<Methods2["get"]["resBody"]>(
                prefix,
                `${prefix1}${PATH2}`,
                GET,
                option
              )
                .json()
                .then((r) => r.body),
            $path: (
              option?:
                | {
                    method?: "get" | undefined;
                    query: Methods2["get"]["query"];
                  }
                | undefined
            ) =>
              `${prefix}${prefix1}${PATH2}${
                option && option.query
                  ? `?${dataToURLString(option.query)}`
                  : ""
              }`,
          },
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods1["get"]["resBody"]>(
              prefix,
              prefix1,
              GET,
              option
            ).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods1["get"]["resBody"]>(prefix, prefix1, GET, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
