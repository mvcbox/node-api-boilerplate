export interface RpcRequest<T> {
  id: string;
  params: T;
}
