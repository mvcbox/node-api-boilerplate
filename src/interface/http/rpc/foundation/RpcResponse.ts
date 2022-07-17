export type RpcResponse<T> = {
  id: string;
  error: {
    code: string;
    params?: {
      [key: string]: any;
    };
    debug?: {
      [key: string]: any;
    };
  };
} | {
  id: string;
  result: T;
};
