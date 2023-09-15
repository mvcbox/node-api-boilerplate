import dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });
import crypto from 'crypto';
import { Buffer } from 'buffer';
import { Options } from 'sequelize';

export const config = {
  isDebugMode: process.env.NODE_ENV !== 'production',
  globalSalt: process.env.GLOBAL_SALT ? Buffer.from(process.env.GLOBAL_SALT, 'base64') : crypto.randomBytes(33),
  interface: {
    http: {
      rpc: {
        listen: {
          host: process.env.INTERFACE_HTTP_RPC_LISTEN_HOST ?? '127.0.0.1',
          port: process.env.INTERFACE_HTTP_RPC_LISTEN_PORT ?? '3000'
        }
      }
    }
  },
  database: {
    dialect: 'postgres',
    replication: {
      write: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT ?? '5432', 10) || 5432,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DBNAME
      },
      read: [
        {
          host: process.env.DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT ?? '5432', 10) || 5432,
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_DBNAME
        }
      ]
    },
    pool: {
      min: 1,
      max: 10
    },
    logging: console.log,
    benchmark: true,
    ssl: !!Number(process.env.DATABASE_SSL_ENABLE ?? '0')
  } as Options,
  emailService: {
    fromEmail: process.env.SMTP_FROM_EMAIL ?? '',
    nodemailer: {
      pool: true,
      host: process.env.SMTP_HOST || '',
      port: parseInt(process.env.SMTP_PORT ?? '', 10) || 465,
      secure: true, // use TLS
      auth: {
        user: process.env.SMTP_USERNAME || '',
        pass: process.env.SMTP_PASSWORD || ''
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    }
  },
  auth: {
    authTokenLifeTime: 3600 * 24
  }
};
