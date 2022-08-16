import { resolveAspida } from "aspida-swr-adapter";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { apiClient } from "~/src/apiClient";
import { useIntParam } from "~/src/useIntParam";

/**
 * This is an example of *lazy param*s, which is passed through
 * the function `getKey()` in the returned tuple.
 * They can be used together with *eager param*s,
 * which `resolveAspida()` function takes.
 */
const UsersIndexPage: NextPage = () => {
  const { value: userId } = useIntParam("userId");

  const router = useRouter();
  const token = router.query.token;

  const [getKey, fetcher] = resolveAspida(
    userId !== undefined && // Conditional; fetched only when userId is defined.
      apiClient.users._userId(userId).posts,
    "$get",
    isValidToken(token) && // Conditional; fetched only when passed `[token]`.
      ([token] as const)
  ).withParams<[page: number]>( // should annotate lazy params explicitly.
    (fn, token, page) => fn({ query: { token, page } })
    // `token` is passed in the argument above.
    // `page` to be passed using `getKey()` function.
  );

  const { data: pagesData, setSize } = useSWRInfinite(
    (pageIndex) => getKey(pageIndex),
    fetcher,
    { initialSize: 2 }
  );

  const showMore = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  if (!isValidToken(token))
    return (
      <div>
        <h1>Invalid Token</h1> <p>token should be specified in query string.</p>
      </div>
    );

  if (!pagesData) return <div>Loading...</div>;

  return (
    <div>
      {pagesData.map((pageData, index, thisArr) => (
        <div key={index}>
          {/* List of posts */}
          <div style={{ padding: 16 }}>
            {pageData.posts.map((user) => (
              <div key={user.id}>
                <Link href={`/users/${user.id}`} passHref>
                  <a>
                    id: {user.id}, name: {user.title}
                  </a>
                </Link>
              </div>
            ))}
          </div>

          <hr />

          {/* At the bottom of the pages shown, "Read more" button appears. */}
          {index + 1 === thisArr.length && (
            <div style={{ padding: 16 }}>
              <button type="button" onClick={showMore}>
                Read More
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UsersIndexPage;

const isValidToken = (
  token: string | string[] | undefined
): token is Exclude<string, ""> => typeof token === "string" && !!token;
