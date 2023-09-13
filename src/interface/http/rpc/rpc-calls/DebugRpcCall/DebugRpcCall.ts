import { assertEquals } from 'typia';
import { Request, Response } from 'express';
import { RpcRequest } from '../../foundation';
import { container } from '../../../../../container';
import { EmailService } from '../../../../../domain/services/EmailService';

export async function DebugRpcCall(req: Request, res: Response) {
  return {};
}
