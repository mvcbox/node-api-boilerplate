import { TypeGuardError } from 'typescript-is';
import { errorToStderr } from './error-to-stderr';
import { Request, Response, NextFunction } from 'express';
import { createErrorResponse } from './create-error-response';
import { ApplicationError } from '../../../../domain/foundation';

export function endpointErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof TypeGuardError) {
      res.status(500).json(createErrorResponse({
        code: 'JSON_RPC:TYPE_VALIDATION_ERROR',
        params: {
          message: err.message
        },
        debug: {
          stack: err.stack
        }
      }, (req as any).__rpcCallId));
    } else if (err instanceof ApplicationError) {
      res.status(500).json(createErrorResponse({
        code: err.code,
        debug: err.debug,
        params: err.params
      }, (req as any).__rpcCallId));
    } else {
      errorToStderr(err);
      res.status(500).json(createErrorResponse({
        code: 'JSON_RPC:INTERNAL_SERVER_ERROR',
        debug: {
          message: err.message,
          stack: err.stack
        }
      }, (req as any).__rpcCallId));
    }
}
