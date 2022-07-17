import { Request, Response } from 'express';
import { assertEquals } from 'typescript-is';
import { RpcRequest } from '../../foundation';
import { container } from '../../../../../container';
import {
  HandleInputDTO,
  GetUserInfoInteractor
} from '../../../../../domain/interactors/GetUserInfoInteractor';

const interactor = container.resolve<GetUserInfoInteractor>(GetUserInfoInteractor);

export async function GetUserInfo(req: Request, res: Response) {
  const input = assertEquals<RpcRequest<HandleInputDTO>>(req.body);
  return interactor.handle(input.params);
}
