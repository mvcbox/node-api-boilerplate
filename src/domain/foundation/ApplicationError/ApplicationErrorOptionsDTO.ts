import { KeyValueDTO } from '../KeyValueDTO';
import { ErrorCodeEnum } from '../ErrorCodeEnum';

export interface ApplicationErrorOptionsDTO {
  code: ErrorCodeEnum;
  debug?: KeyValueDTO;
  params?: KeyValueDTO;
}
