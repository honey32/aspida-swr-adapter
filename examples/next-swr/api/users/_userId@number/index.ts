import { DefineMethods } from "aspida";

export type UserDetail = {
  id: number;
  name: string;
};

export type Methods = DefineMethods<{ get: { resBody: UserDetail } }>;
