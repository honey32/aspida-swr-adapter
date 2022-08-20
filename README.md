# Aspida-SWR Adapter

[![npm version](https://badge.fury.io/js/aspida-swr-adapter.svg)](https://badge.fury.io/js/aspida-swr-adapter) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Just one function**, which adapt

- **api definition** generated by [aspida](https://github.com/aspida/aspida) 
- to **hooks** provided by [@vercel/swr](https://github.com/vercel/swr)

This enables [Conditional or Depentent Fetching](https://swr.vercel.app/docs/conditional-fetching) in easy, DRY, and null-safe way.

## Quick Start

This library has only one API  

```plaintext
aspidaToSWR(api, method, extra).params<[p_0: Type, ...]>(callback);
```

whose return values `[getKey, fetcher]` (in tuple) are ready to pass to `useSWR`, `useSWRInfinite`, and `useSWRImmutable`.

For example...

### Simple

```tsx
// GET ${basePath}/users/{userId}&token=xyz

// userId: number | undefined
// token: string | undefined

const args = aspidaToSWR(
  userId !== undefined && apiClient.users._userId(userId),
  "$get",
  isValidToken(token) && ([token] as const)
).params<[]>((fn, token) => fn( query: { token } ));

const { data } = useSWR(...args);
```

### Keys with Parameters

```tsx
// GET ${basePath}/users/{userId}/posts?page=2&token=xyz

// userId: number | undefined
// token: string | undefined

const [getKey, fetcher] = aspidaToSWR(
  userId !== undefined &&
    apiClient.users._userId(userId).posts,
  "$get",
  isValidToken(token) &&
    ([token] as const)
).params<[page: number]>(
  (fn, token, page) => fn({ query: { token, page } })
);

const { data: pagesData, setSize } = useSWRInfinite(
  (pageIndex) => getKey(pageIndex),
  fetcher,
  { initialSize: 2 }
);

```

Let's take a closer look.

```tsx
// userId: number | undefined
// token: string | undefined

const [getKey, fetcher] = aspidaToSWR(
  // api: Api (if falsy, SWR will not start request)
  userId !== undefined &&
    apiClient.users._userId(userId).posts,
  // method: declared method in Api
  "$get",
  // extra: [string] tuple (if *falsy*, SWR will not start request)
  isValidToken(token) &&
    ([token] as const)
).params<[page: number]>(
  // getKey to be (page: number) => keys
  (fn, token, page) => fn({ query: { token, page } })
  // tell how to fetch data using 
  //   extra ([string]) and params ([page: number])
  // where `fn` is `apiClient.users._userId(userId).posts.$get`
);

const { data: pagesData, setSize } = useSWRInfinite(
  (pageIndex) => getKey(pageIndex),
  fetcher,
  { initialSize: 2 }
);

```

## Examples

In [`examples/next-swr`](examples/next-swr) subproject, You can find some example code (using Next.js) like below.
