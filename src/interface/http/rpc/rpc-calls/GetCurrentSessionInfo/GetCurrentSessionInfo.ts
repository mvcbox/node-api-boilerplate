import { assertEquals } from 'typia';
import { Request, Response } from 'express';
import { RpcRequest } from '../../foundation';
import { container } from '../../../../../container';
import {
  HandleInputDTO,
  GetCurrentSessionInfoInteractor
} from '../../../../../domain/interactors/GetCurrentSessionInfoInteractor';

const interactor = container.resolve<GetCurrentSessionInfoInteractor>(GetCurrentSessionInfoInteractor);

export async function GetCurrentSessionInfo(req: Request, res: Response) {
  const input = assertEquals<RpcRequest<HandleInputDTO>>(req.body);
  return interactor.handle(input.params);
}
