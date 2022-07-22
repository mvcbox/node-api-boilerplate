import { Request, Response } from 'express';
import { assertEquals } from 'typescript-is';
import { RpcRequest } from '../../foundation';
import { container } from '../../../../../container';
import {
  HandleInputDTO,
  SignInInteractor
} from '../../../../../domain/interactors/SignInInteractor';

const interactor = container.resolve<SignInInteractor>(SignInInteractor);

export async function SignIn(req: Request, res: Response) {
  const input = assertEquals<RpcRequest<HandleInputDTO>>(req.body);
  return interactor.handle(input.params);
}
