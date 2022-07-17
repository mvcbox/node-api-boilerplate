import _ from 'lodash';
import util from 'util';
import { InspectOptions } from 'util';
import { LogServiceContextRecord } from './LogServiceContextRecord';
import { LogServiceContextOptionsDTO } from './LogServiceContextOptionsDTO';

export class LogServiceContext {
  public readonly initializedAt: Date;
  public readonly logGroupName: string;
  public readonly inspectorOptions?: InspectOptions;
  public readonly logRecords: LogServiceContextRecord[];

  public constructor(options: LogServiceContextOptionsDTO) {
    this.logRecords = [];
    this.initializedAt = new Date();
    this.logGroupName = options.logGroupName;
    this.inspectorOptions = options.inspectorOptions;
  }

  public log(name: string, value: any, inspectorOptions?: InspectOptions): void {
    this.logRecords.push({
      name,
      isError: false,
      initializedAt: new Date(),
      value: util.inspect(value, _.merge({}, this.inspectorOptions ?? {}, inspectorOptions ?? {}))
    });
  }

  public error(name: string, value: any, inspectorOptions?: InspectOptions): void {
    this.logRecords.push({
      name,
      isError: true,
      initializedAt: new Date(),
      value: util.inspect(value, _.merge({}, this.inspectorOptions ?? {}, inspectorOptions ?? {}))
    });
  }

  public logAndReturn<T>(name: string, value: T, inspectorOptions?: InspectOptions): T {
    this.log(name, value, inspectorOptions);
    return value;
  }

  public errorAndReturn<T>(name: string, value: T, inspectorOptions?: InspectOptions): T {
    this.error(name, value, inspectorOptions);
    return value;
  }
}
