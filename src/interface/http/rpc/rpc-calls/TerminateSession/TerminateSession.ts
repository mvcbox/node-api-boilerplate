import { assertEquals } from 'typia';
import { Request, Response } from 'express';
import { RpcRequest } from '../../foundation';
import { container } from '../../../../../container';
import {
  HandleInputDTO,
  TerminateSessionInteractor
} from '../../../../../domain/interactors/TerminateSessionInteractor';

const interactor = container.resolve<TerminateSessionInteractor>(TerminateSessionInteractor);

export async function TerminateSession(req: Request, res: Response) {
  const input = assertEquals<RpcRequest<HandleInputDTO>>(req.body);
  return interactor.handle(input.params);
}
