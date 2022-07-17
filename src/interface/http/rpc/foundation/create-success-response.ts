import { RpcResponse } from './RpcResponse';

export function createSuccessResponse<T>(result: T, id: string): RpcResponse<T> {
    return {
      id: String(id),
      result
    };
}
