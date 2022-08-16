import { NextPage } from "next";
import useSWR from "swr";
import { aspidaToSWR } from "aspida-swr-adapter";
import { apiClient } from "~/src/apiClient";
import { useIntParam } from "~/src/useIntParam";

const UserDetailPage: NextPage = () => {
  const { value: userId } = useIntParam("userId");

  const args = aspidaToSWR(
    userId !== undefined && apiClient.users._userId(userId),
    "$get",
    []
  ).params<[]>((fn) => fn());

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
