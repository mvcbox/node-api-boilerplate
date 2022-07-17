import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { rpcCalls } from './rpc-calls';
import cookieParser from 'cookie-parser';
import express, { Request, Response, NextFunction } from 'express';
import { createErrorResponse, endpointErrorHandler } from './foundation';

export const app = express();

app.set('trust proxy', true);
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({
  limit: '3MB'
}));
app.use(express.urlencoded({
  limit: '3MB',
  extended: false
}));
app.use(cookieParser());
app.use(function(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'POST') {
    (req as any).__rpcCallId = String(req.body.id);
  }

  next();
});
app.use('/rpc', rpcCalls);
app.use(function(req: Request, res: Response) {
    res.status(500).json(createErrorResponse({
      code: 'JSON_RPC:INVALID_RPC_CALL'
    }, (req as any).__rpcCallId));
});
app.use(endpointErrorHandler);
