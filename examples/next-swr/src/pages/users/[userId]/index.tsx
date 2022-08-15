import { NextPage } from "next";
import { resolveAspida } from "aspida-swr-adapter";
import { apiClient } from "~/src/apiClient";
import { useRouter } from "next/router";
import useSWR from "swr";

const useIntParam = (
  key: string
): { value: number | undefined; invalid: boolean } => {
  const router = useRouter();

  const raw = router.query[key] as string | undefined;

  if (!raw) return { value: undefined, invalid: false };

  const value = Number.parseInt(raw);

  if (Number.isNaN(value)) return { value: undefined, invalid: true };

  return { value, invalid: false };
};

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
