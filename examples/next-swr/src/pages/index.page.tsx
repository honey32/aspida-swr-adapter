import { resolveAspida } from "aspida-swr-adapter";
import type { NextPage } from "next";
import useSWR from "swr";
import { apiClient } from "~/src/apiClient";

const Home: NextPage = () => {
  const args = resolveAspida(apiClient.hello, "$get", []).withParams<[]>((fn) =>
    fn()
  );
  const { data } = useSWR(...args);

  if (!data) return <div>Loading</div>;

  return <div>message: {data.message}</div>;
};

export default Home;
