import { Request, Response } from 'express';
import { assertEquals } from 'typescript-is';
import { RpcRequest } from '../../foundation';
import { container } from '../../../../../container';
import { EmailService } from '../../../../../domain/services/EmailService';

export async function DebugRpcCall(req: Request, res: Response) {
  return {};
}
