import { MILLISECONDS_IN_DAY } from 'src/common/constants';
import { DAYS_BETWEEN_BOOKING } from '../../../common/constants/busines-logic.constant';

export class ValidateBookService {
  public isAutoAvailableToBook(start: Date, lastBooking: string): boolean {
    if (!lastBooking) return true;

    const lastEndDate = new Date(lastBooking);
    const days = (start.getTime() - lastEndDate.getTime()) / MILLISECONDS_IN_DAY;

    return days >= DAYS_BETWEEN_BOOKING;
  }
}
