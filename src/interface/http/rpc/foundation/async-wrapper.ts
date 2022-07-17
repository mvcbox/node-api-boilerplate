import { createSuccessResponse } from '../foundation';
import { Request, Response, NextFunction } from 'express';

export function asyncWrapper(callback: (_req: Request, _res: Response, _next: NextFunction) => Promise<any>) {
  return function(req: Request, res: Response, next: NextFunction): void {
    callback(req, res, next).then(function(result) {
      res.json(createSuccessResponse(result, (req as any).__rpcCallId));
    }).catch(next);
  };
}
