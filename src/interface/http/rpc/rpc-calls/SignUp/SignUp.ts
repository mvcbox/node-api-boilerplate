import { Request, Response } from 'express';
import { assertEquals } from 'typescript-is';
import { RpcRequest } from '../../foundation';
import { container } from '../../../../../container';
import {
  HandleInputDTO,
  SignUpInteractor
} from '../../../../../domain/interactors/SignUpInteractor';

const interactor = container.resolve<SignUpInteractor>(SignUpInteractor);

export async function SignUp(req: Request, res: Response) {
  const input = assertEquals<RpcRequest<HandleInputDTO>>(req.body);
  return interactor.handle(input.params);
}
