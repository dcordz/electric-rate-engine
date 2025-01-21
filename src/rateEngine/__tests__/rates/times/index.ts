export enum EDayOfWeek {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
  }
  
  export const WEEKDAYS = [
    EDayOfWeek.MONDAY,
    EDayOfWeek.TUESDAY,
    EDayOfWeek.WEDNESDAY,
    EDayOfWeek.THURSDAY,
    EDayOfWeek.FRIDAY,
  ];
  
  export const WEEKEND = [EDayOfWeek.SATURDAY, EDayOfWeek.SUNDAY];
  
  export const ALL_DAYS_OF_WEEK = [
    EDayOfWeek.SUNDAY,
    EDayOfWeek.MONDAY,
    EDayOfWeek.TUESDAY,
    EDayOfWeek.WEDNESDAY,
    EDayOfWeek.THURSDAY,
    EDayOfWeek.FRIDAY,
    EDayOfWeek.SATURDAY,
  ];
  
  export type TRateYear = 2024 | 2025 | 2026 | 2027 | 2028 | 2029 | 2030 | 2031;
  
  export const MIN_RATE_YEAR = new Date().getFullYear() as TRateYear;
  export const MAX_RATE_YEAR = 2031 as TRateYear;
  export const ALL_RATE_YEARS = [2025, 2026, 2027, 2028, 2029, 2030, 2031] as TRateYear[];
  

  export enum EMonthsOfYear {
    JANUARY = 0, // dayjs starts at 0
    FEBRUARY = 1,
    MARCH = 2,
    APRIL = 3,
    MAY = 4,
    JUNE = 5,
    JULY = 6,
    AUGUST = 7,
    SEPTEMBER = 8,
    OCTOBER = 9,
    NOVEMBER = 10,
    DECEMBER = 11,
  }
  
  export const SUMMER = [EMonthsOfYear.JUNE, EMonthsOfYear.JULY, EMonthsOfYear.AUGUST, EMonthsOfYear.SEPTEMBER];
  
  export const WINTER = [
    EMonthsOfYear.JANUARY,
    EMonthsOfYear.FEBRUARY,
    EMonthsOfYear.MARCH,
    EMonthsOfYear.APRIL,
    EMonthsOfYear.MAY,
    EMonthsOfYear.OCTOBER,
    EMonthsOfYear.NOVEMBER,
    EMonthsOfYear.DECEMBER,
  ];
  
  export const ALL_MONTHS_OF_YEAR = [
    EMonthsOfYear.JANUARY,
    EMonthsOfYear.FEBRUARY,
    EMonthsOfYear.MARCH,
    EMonthsOfYear.APRIL,
    EMonthsOfYear.MAY,
    EMonthsOfYear.JUNE,
    EMonthsOfYear.JULY,
    EMonthsOfYear.AUGUST,
    EMonthsOfYear.SEPTEMBER,
    EMonthsOfYear.OCTOBER,
    EMonthsOfYear.NOVEMBER,
    EMonthsOfYear.DECEMBER,
  ];
  