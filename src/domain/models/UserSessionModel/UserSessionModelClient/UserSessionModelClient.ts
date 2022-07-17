export interface UserSessionModelClient {
  os?: {
    name?: string;
    version?: string;
  };
  device?: {
    type?: string;
    model?: string;
    vendor?: string;
  };
  client?: {
    name?: string;
    version?: string;
  };
  location?: {
    city?: string;
    region?: string;
    country?: string;
  };
  ipAddress?: string;
  userAgent?: string;
}
