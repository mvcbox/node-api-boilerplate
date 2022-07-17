import { UserSessionModelProperties } from '../../../models/UserSessionModel';

export interface HandleOutputDTO {
  count: number;
  rows: Omit<UserSessionModelProperties, 'authToken' | 'refreshToken'>[];
}
