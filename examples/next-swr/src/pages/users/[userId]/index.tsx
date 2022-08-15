import { NextPage } from "next";
import { resolveAspida } from "aspida-swr-adapter";
import { apiClient } from "~/src/apiClient";
import { useIntParam } from "~/src/useIntParam";
import useSWR from "swr";

const UserDetailPage: NextPage = () => {
  const { value: userId } = useIntParam("userId");

  const args = resolveAspida(
    userId !== undefined && apiClient.users._userId(userId),
    "$get",
    []
  ).withParams<[]>((fn) => fn());

  const { data } = useSWR(...args);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <div>id: {data.id}</div>
      <div>name: {data.name}</div>
    </div>
  );
};

export default UserDetailPage;
