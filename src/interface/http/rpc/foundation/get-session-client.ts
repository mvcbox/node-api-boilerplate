//import geoip from 'geoip-lite';
import { Request } from 'express';
import userAgentParser from 'ua-parser-js';
import { UserSessionModelClient } from '../../../../domain/models/UserSessionModel';

export function getSessionClient(req: Request): UserSessionModelClient {
  const userAgent = req.get('user-agent') ?? '';
  const ipAddress = req.get('x-forwarded-for') || req.socket.remoteAddress || '127.0.0.1';
  //const geo = geoip.lookup(ipAddress);
  const ua = userAgentParser(userAgent);

  return {
    userAgent,
    ipAddress,
    os: {
      name: ua.os.name,
      version: ua.os.version
    },
    client: {
      name: ua.browser.name,
      version: ua.browser.version
    },
    device: {
      type: ua.device.type,
      model: ua.device.model,
      vendor: ua.device.vendor
    },
    // location: {
    //   city: geo?.city,
    //   region: geo?.region,
    //   country: geo?.country
    // }
  };
}
