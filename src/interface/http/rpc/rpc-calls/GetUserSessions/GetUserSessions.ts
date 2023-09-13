import { assertEquals } from 'typia';
import { Request, Response } from 'express';
import { RpcRequest } from '../../foundation';
import { container } from '../../../../../container';
import {
  HandleInputDTO,
  GetUserSessionsInteractor
} from '../../../../../domain/interactors/GetUserSessionsInteractor';

const interactor = container.resolve<GetUserSessionsInteractor>(GetUserSessionsInteractor);

export async function GetUserSessions(req: Request, res: Response) {
  const input = assertEquals<RpcRequest<HandleInputDTO>>(req.body);
  return interactor.handle(input.params);
}
