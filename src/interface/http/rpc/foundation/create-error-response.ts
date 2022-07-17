import _ from 'lodash';
import { config } from '../../../../config';
import { RpcResponse } from './RpcResponse';

interface ErrorData {
  code: string;
  debug?: {
    [key: string]: any;
  };
  params?: {
    [key: string]: any;
  };
}

export function createErrorResponse<T = any>(error: ErrorData, id: string): RpcResponse<T> {
  return {
    id: String(id),
    error: config.isDebugMode ? error : _.omit(error, ['debug'])
  };
}
