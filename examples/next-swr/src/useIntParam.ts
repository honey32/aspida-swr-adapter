import { useRouter } from "next/router";

export const useIntParam = (
  key: string
): { value: number | undefined; invalid: boolean } => {
  const router = useRouter();

  const raw = router.query[key] as string | undefined;

  if (!raw) return { value: undefined, invalid: false };

  const value = Number.parseInt(raw);

  if (Number.isNaN(value)) return { value: undefined, invalid: true };

  return { value, invalid: false };
};
