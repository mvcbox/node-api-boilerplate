import { IpAddress } from './IpAddress';
import { NetworkProtocolTypeEnum } from './NetworkProtocolTypeEnum';

export interface ServerAddress {
  protocol: NetworkProtocolTypeEnum;
  address: IpAddress;
  port: number;
}
