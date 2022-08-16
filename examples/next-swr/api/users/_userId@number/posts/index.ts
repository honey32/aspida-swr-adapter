import { DefineMethods } from "aspida";

export type UserPostsIndex = {
  posts: { id: number; title: string }[];
};

export type Methods = DefineMethods<{
  get: { query: { page: number; token: string }; resBody: UserPostsIndex };
}>;
