import moment from 'moment';

export function errorToStderr(...args: any[]): void {
  console.error(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`, ...args);
}
