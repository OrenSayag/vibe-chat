import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  format,
  isBefore,
  isThisWeek,
  isThisYear,
  isToday,
  isWithinInterval,
  isYesterday,
  subDays,
  subMonths,
} from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function customFormatDate(date: Date, type?: 'day') {
  const today = new Date();

  if (type === 'day') {
    if (isToday(date)) {
      return 'Today';
    }
    if (isYesterday(date)) {
      return 'Yesterday';
    }
    if (
      isWithinInterval(date, { start: new Date(), end: subDays(new Date(), 7) })
    ) {
      return format(date, 'EEEE');
    }
    if (
      isWithinInterval(date, {
        start: new Date(),
        end: subMonths(new Date(), 12),
      })
    ) {
      return format(date, 'dd/MM');
    }
    if (isBefore(date, today)) {
      return format(date, 'dd/MM/yyyy');
    }
  }

  if (isToday(date)) {
    return format(date, 'HH:mm');
  }
  if (isThisWeek(date, { weekStartsOn: 1 })) {
    return format(date, 'EEEE, HH:mm'); // Day name (e.g., "Monday")
  }
  if (isThisYear(date)) {
    return format(date, 'MMMM d, HH:mm'); // Month and day (e.g., "March 15")
  }
  if (isBefore(date, today)) {
    return format(date, 'PP, , HH:mm'); // Full date (e.g., "01/10/2022")
  }
  throw new Error('logic error in customFormatDate');
}
