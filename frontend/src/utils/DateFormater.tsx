class DateFormater {
  static fromJavaLocalDateStr(dateStr: string): Date {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
}

export default DateFormater;