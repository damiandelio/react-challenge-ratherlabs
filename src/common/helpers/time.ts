import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function convertLocalToUtc(localTime: string): string {
  return dayjs
    .tz(localTime, dayjs.tz.guess())
    .utc()
    .format('YYYY-MM-DD HH:mm:ss[Z]');
}

// Converts a UTC time string to a local datetime string formatted for MUI's "datetime-local" input.
export function convertUtcToLocal(utcTime: string): string {
  return dayjs.utc(utcTime).local().format('YYYY-MM-DD[T]HH:mm');
}
