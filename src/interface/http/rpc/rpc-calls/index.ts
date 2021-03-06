import express from 'express';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { GetUserInfo } from './GetUserInfo';
import { asyncWrapper } from '../foundation';
import { DebugRpcCall } from './DebugRpcCall';
import { GetUserSessions } from './GetUserSessions';
import { RefreshAuthToken } from './RefreshAuthToken';
import { TerminateSession } from './TerminateSession';
import { GetCurrentSessionInfo } from './GetCurrentSessionInfo';

export const rpcCalls = express.Router({
  mergeParams: true,
  caseSensitive: true
});

rpcCalls.post('/SignIn', asyncWrapper(SignIn));
rpcCalls.post('/SignUp', asyncWrapper(SignUp));
rpcCalls.post('/GetUserInfo', asyncWrapper(GetUserInfo));
rpcCalls.post('/DebugRpcCall', asyncWrapper(DebugRpcCall));
rpcCalls.post('/GetUserSessions', asyncWrapper(GetUserSessions));
rpcCalls.post('/RefreshAuthToken', asyncWrapper(RefreshAuthToken));
rpcCalls.post('/TerminateSession', asyncWrapper(TerminateSession));
rpcCalls.post('/GetCurrentSessionInfo', asyncWrapper(GetCurrentSessionInfo));
