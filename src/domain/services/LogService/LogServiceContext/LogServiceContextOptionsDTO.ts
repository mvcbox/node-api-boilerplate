import { InspectOptions } from 'util';

export interface LogServiceContextOptionsDTO {
  logGroupName: string;
  inspectorOptions?: InspectOptions;
}
