import { IpAddressVersionEnum } from './IpAddressVersionEnum';

export interface IpAddress {
  address: string;
  version: IpAddressVersionEnum;
}
