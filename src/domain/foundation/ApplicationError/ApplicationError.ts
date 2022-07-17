import { KeyValueDTO } from '../KeyValueDTO';
import { ErrorCodeEnum } from '../ErrorCodeEnum';
import { ApplicationErrorOptionsDTO } from './ApplicationErrorOptionsDTO';

export class ApplicationError extends Error {
  public readonly code: ErrorCodeEnum;
  public readonly debug?: KeyValueDTO;
  public readonly params?: KeyValueDTO;

  public constructor(options: ApplicationErrorOptionsDTO) {
    super('ApplicationError');
    this.code = options.code;
    this.debug = options.debug;
    this.params = options.params;

    if (!this.debug?.stack) {
      this.debug = {
        ...(this.debug ?? {}),
        stack: this.stack
      };
    }
  }
}
