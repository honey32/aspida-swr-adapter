import { DefineMethods } from "aspida";

type HelloDetail = {
  message: string;
};

export type Methods = DefineMethods<{ get: { resBody: HelloDetail } }>;
