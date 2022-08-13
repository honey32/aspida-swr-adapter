import { DefineMethods } from "aspida";

export type HelloDetail = {
  message: string;
};

export type Methods = DefineMethods<{ get: { resBody: HelloDetail } }>;
