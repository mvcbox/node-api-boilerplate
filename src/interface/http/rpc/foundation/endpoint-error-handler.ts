import { v4 as uuid } from 'uuid';
import { TypeGuardError } from 'typia';
import { errorToStderr } from './error-to-stderr';
import { container } from '../../../../container';
import { Request, Response, NextFunction } from 'express';
import { createErrorResponse } from './create-error-response';
import { ApplicationError } from '../../../../domain/foundation';
import { LogService } from '../../../../domain/services/LogService';

const logService = container.resolve<LogService>(LogService);

export function endpointErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  const errorId = `${uuid()}-${Date.now()}`;

  logService.wrap('EndpointErrorHandler', logContext => {
    logContext.log('err', err);
    logContext.log('errorId', errorId);
    logContext.log('req.body', req.body);
    logContext.log('req.path', req.path);
    logContext.log('req.method', req.method);
    logContext.log('req.headers', req.headers);
  });

  if (err instanceof TypeGuardError) {
    res.status(500).json(createErrorResponse({
      code: 'JSON_RPC:TYPE_VALIDATION_ERROR',
      params: {
        errorId,
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
      params: {
        ...err.params,
        errorId
      }
    }, (req as any).__rpcCallId));
  } else {
    errorToStderr(errorId, '\n', err);
    res.status(500).json(createErrorResponse({
      code: 'JSON_RPC:INTERNAL_SERVER_ERROR',
      params: {
        errorId
      },
      debug: {
        message: err.message,
        stack: err.stack
      }
    }, (req as any).__rpcCallId));
  }
}
