import moment from 'moment';

export function errorToStderr(err: any): void {
  console.error(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]:`, err);
}
