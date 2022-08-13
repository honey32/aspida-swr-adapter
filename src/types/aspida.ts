export type AnyApi = Record<string, any> & {
  $path: (option?: any) => string;
};

export type MethodOf<T> = {
  [K in keyof T]: T[K] extends (option: any) => Promise<any> ? K : never;
}[keyof T];
