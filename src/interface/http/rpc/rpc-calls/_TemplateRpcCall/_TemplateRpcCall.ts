import { assertEquals } from 'typia';
import { Request, Response } from 'express';
import { RpcRequest } from '../../foundation';
import { container } from '../../../../../container';
import {
  HandleInputDTO,
  _TemplateInteractor
} from '../../../../../domain/interactors/_TemplateInteractor';

const interactor = container.resolve<_TemplateInteractor>(_TemplateInteractor);

export async function _TemplateRpcCall(req: Request, res: Response) {
  const input = assertEquals<RpcRequest<HandleInputDTO>>(req.body);
  return interactor.handle(input.params);
}
