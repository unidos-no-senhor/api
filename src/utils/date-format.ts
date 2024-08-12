//create a class to apply the date format to the date fields, it must be used in the create and update methods of the service, and be interchangeable in accord with the entity that is being used
// Path: src/utils/dateFormat.ts
import moment from 'moment';
// const moment = require('moment').default || require('moment');
export class DateFormat {
  public static apply(date: string | Date): string | null {
    if (date == null) return null;
    return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
  }

  public static revert(date: string | Date): string | null {
    if (date == null) return null;
    return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
  }
}
