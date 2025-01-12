const getDaysInMonth = (month: number, year: number) => {
  const date = new Date(year, month, 1);
  var days: string[] = [];
  while (date.getMonth() === month) {
    const newDate = new Date(date).toLocaleDateString("en-CA");
    days = [...days, newDate];
    date.setDate(date.getDate() + 1);
  }
  return days;
};

export default getDaysInMonth;
