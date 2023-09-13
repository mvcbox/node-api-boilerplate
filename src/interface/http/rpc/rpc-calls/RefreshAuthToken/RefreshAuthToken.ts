import { assertEquals } from 'typia';
import { Request, Response } from 'express';
import { container } from '../../../../../container';
import { RpcRequest, getSessionClient } from '../../foundation';
import {
  HandleInputDTO,
  RefreshAuthTokenInteractor
} from '../../../../../domain/interactors/RefreshAuthTokenInteractor';

const interactor = container.resolve<RefreshAuthTokenInteractor>(RefreshAuthTokenInteractor);

export async function RefreshAuthToken(req: Request, res: Response) {
  const input = assertEquals<RpcRequest<HandleInputDTO>>(req.body);
  input.params.session.client = getSessionClient(req);
  return interactor.handle(input.params);
}
